const mysql = require('mysql2/promise')
const Importer = require('mysql-import');

const [host, user, password, database] = ['localhost', 'root', "", 'internet_shop']
class Database {
    constructor() {
        if (Database.exists){
            return Database.instance;
        }
    }

    async init() {
        await this.createDatabase();
        this.db = await mysql.createConnection({
            host,
            user,
            password,
            database
        })
        console.log('Database connected')
        Database.exists = true;
        Database.instance = this;
    }

    async createDatabase() {
        const db = await mysql.createConnection({
            host,
            user,
            password
        })
        await db.query('CREATE DATABASE IF NOT EXISTS clothes')
        const importer = new Importer({host, user, password, database});
        importer.import(`${database}.sql`).then(()=>{
            const files_imported = importer.getImported();
            console.log(`${files_imported.length} SQL file(s) imported.`);
        }).catch(err=> {
            // console.error(err);
        });
        db.end();
    }

    async query(sql) {
        return (await this.db.query(sql))[0];
    }

    // id типа одежды по ее ссылке
    async getClotheTypeId(clotheType) {
        const sql = `SELECT id FROM clothe_types WHERE link = '${clotheType}'`
        const [[{id}], _] = await this.db.query(sql);
        return id;
    }

    // Получить все вещи типа clotheType
    async getAllClothes(clotheType) {
        const id = await this.getClotheTypeId(clotheType)
        const sql = `SELECT 
                    t1.id, 
                    t1.price, 
                    t1.name,
                    t2.link AS image
                    FROM 
                    (SELECT * FROM clothes WHERE clothe_type_id = ${id}) t1
                    INNER JOIN 
                    (SELECT link, clothe_id FROM images GROUP BY clothe_id) t2
                    ON t1.id = t2.clothe_id
                    `
        return (await this.db.query(sql))[0];
    }


    // Получить вещь по и id
    async getClotheById(id) {
        const sql = `SELECT
            id,
            name,
            price,
            images,
            description,
            size_name,
            size_count,
            size_id
            FROM 
            (
            SELECT 
            GROUP_CONCAT (sizes.name SEPARATOR ', ') AS size_name,
            GROUP_CONCAT (sizes_counts.count SEPARATOR ', ') AS size_count,
            GROUP_CONCAT (sizes.id SEPARATOR ', ') AS size_id,
            sizes_counts.clothe_id
            FROM sizes, sizes_counts 
            WHERE sizes_counts.size_id = sizes.id 
            AND sizes_counts.clothe_id = ${id} GROUP BY sizes_counts.clothe_id) m1
            INNER JOIN 
            (SELECT 
             t1.name, 
            t1.price, 
            t1.id, 
            t1.description,
            t2.links as images
             FROM
            (SELECT * FROM clothes WHERE id = ${id}) t1
            INNER JOIN 
            (SELECT GROUP_CONCAT(link SEPARATOR ', ') as links, clothe_id FROM images GROUP BY clothe_id) t2
            ON t1.id = t2.clothe_id) m2
            ON m2.id = m1.clothe_id`
        const [result] = (await this.db.query(sql))[0];
        result.sizes = result.size_name.split(', ').map((name, index) => ({
            name,
            count: result.size_count.split(', ')[index],
            id: result.size_id.split(', ')[index]
        }))
        delete result.size_name
        delete result.size_id
        delete result.size_count
        result.images = result.images.split(', ');
        return result
    }



    // Получить все sizes_counts_id по sizes_price.id
    getSizes(id){
        const sql = `SELECT sizes_counts_id FROM sizes_price WHERE id=${id}`
        return new Promise((resolve) => {
            this.db.query(sql, (err, result)=> {
                if (err) throw err;
                return resolve(JSON.parse(result[0].sizes_counts_id));
            })
        })
    }

    // Получить количество и название размера
    getCountAndIdSize(id){
        const sql = `SELECT * FROM sizes_counts WHERE id=${id}`
        return new Promise((resolve) => {
            this.db.query(sql, (err, result)=> {
                if (err) throw err;
                return resolve(result[0]);
            })
        })
    }

    // Получаем название размера по его id
    getNameSize(id){
        const sql = `SELECT sizes.name FROM sizes, sizes_counts ` +
            ` WHERE sizes_counts.id=${id}` +
            ` AND sizes_counts.size_id = sizes.id`
        return new Promise((resolve) => {
            this.db.query(sql, (err, result)=> {
                if (err) throw err;
                return resolve(result[0].name);
            })
        })
    }

    getClotheByIdWithPriceAndSizes(clotheType, id) {
        return new Promise((resolve, reject) => {
            this.getProductTypeId(clotheType).then(clotheTypeId => {
                this.getClotheByIdWithPrice(clotheType, id).then( result => {
                    result.product_type_id = clotheTypeId;
                    this.getSizes(result.sizes_price_id).then( arrSizes => {
                        const sizesCounts = [];
                        arrSizes.forEach((sizeId, ind) => {
                            const sizeCountObj = {name: "", count: 0, id:0}
                            this.getCountAndIdSize(sizeId).then(countAndId => {
                                sizeCountObj.count = countAndId.count;
                                sizeCountObj.id = countAndId.size_id;
                                this.getNameSize(sizeId).then(name => {
                                    sizeCountObj.name = name
                                    if (sizeCountObj.count >= 1)
                                        sizesCounts.push(sizeCountObj);
                                    if (ind === arrSizes.length-1){
                                        result.sizes = sizesCounts;
                                        resolve(result);
                                    }
                                });
                            });
                        })
                    })
                }).catch(reject)
            })


        })
    }

    getUserCartItemsArray(userId) {
        const sql = `SELECT * FROM carts WHERE id = ${userId}`;
        return new Promise((resolve)=>{
            this.db.query(sql, (err, result)=> {
                if (err) throw err;
                return resolve(result[0]);
            })
        })
    }

    getSizeCount(sizesCountsId) {
        const sql = `SELECT * FROM sizes_counts WHERE id = ${sizesCountsId}`
        return new Promise(resolve=>{
            this.db.query(sql, (err, result)=> {
                if (err) throw err;
                return resolve(result[0]);
            })
        })
    }

    getItemInUserCart(userId, clotheType, clotheId) {
        return new Promise(resolve => {
            this.getProductTypeId(clotheType).then(clotheTypeId => {
                this.getUserCartItemsArray(userId).then((itemsIds) => {
                    const sizesIds = [];
                    const itemsIdsArray = JSON.parse(itemsIds.items_ids);
                    itemsIdsArray.forEach((itemId, ind) => {
                        this.getCartItem(itemId).then(item => {
                            this.getSizeCount(item.sizes_counts_id).then(sizeCount => {
                                if (clotheTypeId === item.product_type_id && clotheId === item.product_id) {
                                    sizesIds.push(sizeCount.size_id);
                                }
                                if (ind === itemsIdsArray.length-1)
                                    return resolve(sizesIds);
                            })
                        })
                    })
                })
            })
        })
    }

    // Возврат пользователя по email
    async getUserByEmailOrNumber(email, phone) {
        const sql = 'SELECT * FROM users WHERE `e-mail` =' + `'${email}' OR phone_number = ${phone}`
        // Возвращаем первого пользователя
        return (await this.query(sql))[0];
    }

    // Возврат пользователя по id
    getUserById(id) {
        const sql = `SELECT * FROM users WHERE id = ${id}`
        return new Promise(resolve=>{
            this.db.query(sql, (err, result)=> {
                if (err) throw err;
                return resolve(result[0]);
            })
        })
    }

    // Если пользователь существует, возвращает его
    doesUserExists(id, token) {
        const sql = `SELECT * FROM users WHERE id = ${id} AND token = '${token}'`
        return new Promise(resolve=>{
            this.db.query(sql, (err, result)=> {
                if (err) throw err;
                return resolve(result[0]);
            })
        })
    }

    // Смена информации о себе
    changeUserDataById (id, name, email, phone, address) {
        const sql = `UPDATE users SET name = '${name}', email = '${email}', phone_number = '${phone}', address = '${address}' WHERE id=${id}`
        return new Promise(resolve=>{
            this.db.query(sql, (err, result)=> {
                if (err) throw err;
                return resolve(true);
            })
        })
    }

    // Возвращает id только что созданного пользователя
    async registerUser(email, name, phone, address, hash, token) {
        const sql = 'INSERT INTO users (`e-mail`, name, phone_number, address, hash, token)' +
            ` VALUES ('${email}', '${name}', '${phone}', '${address}', '${hash}', '${token}')`
        return (await this.query(sql))['insertId'];
    }

    // Поменять токен пользователя на указанный
    setTokenById (id, token) {
        const sql = `UPDATE users SET token = '${token}' WHERE id = ${id}`
        return new Promise((resolve)=>{
            this.db.query(sql, (err)=> {
                if (err) throw err;
                return resolve(true);
            })
        })
    }

    // ! Корзина

    // Получаем массив из айди вещей корзины пользователя
    getUserCart (id) {
        const sql = `SELECT carts.items_ids FROM carts WHERE id = ${id}`;
        return new Promise((resolve => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(JSON.parse(result[0].items_ids));
            })
        }))
    }

    // Получаем объект корзины по id
    getCartItem (cartItemId) {
        const sql = `SELECT * FROM cart_items WHERE id = ${cartItemId}`;
        return new Promise((resolve => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(result[0]);
            })
        }))
    }

    // Получаем массив из вещей корзины по id пользователя
    getUserCartItems (userId) {
        return new Promise((resolve, reject) => {
            this.getUserCart(userId).then(items => {
                const itemsArray = [];
                if (items.length === 0) {
                    resolve(itemsArray);
                }
                for (let i = 0; i<items.length; i++) {
                    this.getCartItem(items[i]).then(item => {
                        this.getItemObject(item).then(result => {
                            const itemObj = {...result};
                            itemObj.count = item.count;
                            itemObj.id = item.id;
                            itemObj.price*=item.count;
                            itemsArray.push(itemObj);
                            if (i === items.length - 1) {
                                // Возвращаем массив из объектов корзины
                                resolve(itemsArray);
                            }
                        })
                    })
                }
            })
        })

    }

    // Получаем название типа продукта по id
    getProductTypeName (productTypeId) {
        const sql = `SELECT product_types.name FROM product_types WHERE id = ${productTypeId}`;
        return new Promise((resolve => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(result[0].name);
            })
        }))

    }

    // Получаем id типа продукта по названию
    getProductTypeId (productTypeName) {
        const sql = `SELECT id FROM product_types WHERE name = '${productTypeName}'`
        return new Promise((resolve => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(result[0].id);
            })
        }))
    }

    // Возвращает объект, состоящий из: images, name, price, size_name, count, max_count
    getItemObject (item) {
        return new Promise((resolve)=>{
            this.getProductTypeName(item.product_type_id).then(typeName => {
                const sql =
                    'SELECT product.images, product.name, sizes_price.price, sizes.name as size_name, sizes_counts.count as max_count ' +
                    'FROM ' + '`' + typeName + '` AS product, sizes_price, sizes, sizes_counts ' +
                    'WHERE product.id = ' + item.product_id +
                    ' AND sizes_price.id = product.sizes_price_id' +
                    ` AND sizes_counts.id = ${item.sizes_counts_id} ` +
                    ` AND sizes_counts.size_id = sizes.id `;
                this.db.query(sql, (err, result) => {
                    if (err) throw err;
                    return resolve(result[0]);
                })
            })
        })
    }

    changeItemCount(itemId, newCount) {
        return new Promise(resolve => {
            const sql = `UPDATE cart_items SET count = ${newCount} WHERE id = ${itemId}`
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(true);
            })
        })
    }

    getItemPrice(itemId) {
        return new Promise((resolve => {
            const sql1 = `SELECT * FROM cart_items WHERE id = ${itemId}`
            this.db.query(sql1, (err, result1) => {
                this.getProductTypeName(result1[0].product_type_id).then(result => {
                    const typeName = '`' + result + '`'
                    const sql2 = `SELECT sizes_price.price FROM ${typeName}, sizes_price ` +
                        ` WHERE ${typeName}.id = ${result1[0].product_id}` +
                        ` AND ${typeName}.sizes_price_id = sizes_price.id `
                    this.db.query(sql2, (err, result3)=>{
                        if (err) throw err;
                        return resolve(result3[0].price);
                    })
                })
            })
        }))
    }


    deleteUserItemFromTable(itemId){
        return new Promise(resolve => {
            const sql = `DELETE FROM cart_items WHERE id = ${itemId}`
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(true);
            })
        })
    }

    deleteUserItem(cartId, itemId) {
        return new Promise(resolve => {
                this.getUserCart(cartId).then(ids => {
                    console.log(ids.filter(id => id !== itemId))
                    const newIds = JSON.stringify(ids.filter(id => id !== itemId));
                    const sql = `UPDATE carts SET items_ids = '${newIds}' WHERE id=${cartId}`;
                    this.db.query(sql, (err, result) => {
                        if (err) throw err;
                        return resolve(true);
                    })
                })
            })
    }

    getSizesCountsIds (productTypeId, productId) {
        return new Promise(resolve => {
            this.getProductTypeName(productTypeId).then(result => {
                const typeName = '`' + result + '`'
                const sql = `SELECT sizes_price.sizes_counts_id FROM ${typeName}, sizes_price` +
                    ` WHERE ${typeName}.id = ${productId}` +
                    ` AND ${typeName}.sizes_price_id = sizes_price.id`
                this.db.query(sql, (err, result) => {
                    if (err) throw err;
                    return resolve(result[0].sizes_counts_id);
                })
            })
        })
    }

    getSizeId(sizesCountsIds, sizeId){
        return new Promise(resolve => {
            const sql = `SELECT id FROM sizes_counts ` +
                ` WHERE id IN (${sizesCountsIds})` +
                ` AND size_id = ${sizeId}`
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(result[0].id);
            })
        })
    }

    getSizesCountsId (productTypeId, productId, sizeId) {
        return new Promise((resolve, reject) => {
            this.getSizesCountsIds(productTypeId, productId).then(result => {
                result = JSON.parse(result);
                this.getSizeId(result.join(", "), sizeId).then((sizeCountId)=> resolve(sizeCountId))
            })
        })
    }

    addCartItem (productTypeId, productId, sizeId) {
        return new Promise(resolve => {
            this.getSizesCountsId(productTypeId, productId, sizeId).then(sizesCountsId => {
                const sql = 'INSERT INTO cart_items ' +
                    '(product_type_id, product_id, sizes_counts_id, count) ' +
                    `VALUES (${productTypeId}, ${productId}, ${sizesCountsId}, 1)`
                this.db.query(sql, (err, result) => {
                    if (err) throw err;
                    return resolve(result.insertId);
                })
            }).catch(e => console.log(e))
        })
    }

    addCartItemInCart (userId, productTypeId, productId, sizeId) {
        return new Promise(resolve => {
            this.getUserCart(userId).then(ids => {
                if (ids.length === 0) {
                    // Создаем новый корзиночный предмет
                    this.addCartItem(productTypeId, productId, sizeId).then(itemId => {
                        // Добавляем его в корзину пользователя
                        ids.push(itemId);
                        const sql = `UPDATE carts SET items_ids = '${JSON.stringify(ids)}' WHERE id = ${userId}`
                        this.db.query(sql, (err, result) => {
                            if (err) throw err;
                            return resolve(true);
                        })
                    })
                }
                // Проверяем не было ли такого предмета в корзине
                ids.forEach((cartItemId, ind) => {
                    this.getCartItem(cartItemId).then(cartItem => {
                        this.getSizesCountsId(productTypeId, productId, sizeId).then(sizesCountsId => {
                            let flag = false;
                            if (cartItem.product_type_id === productTypeId &&
                                cartItem.product_id === productId &&
                                cartItem.sizes_counts_id === sizesCountsId) {
                                const sql = `UPDATE cart_items SET count = count + 1 WHERE id = ${cartItem.id}`;
                                flag = true;
                                this.db.query(sql, (err, result) => {
                                    if (err) throw err;
                                    return resolve(true);
                                })
                            }
                            if (!flag && ind === ids.length - 1) {
                                // Создаем новый корзиночный предмет
                                this.addCartItem(productTypeId, productId, sizeId).then(itemId => {
                                    // Добавляем его в корзину пользователя
                                    ids.push(itemId);
                                    const sql = `UPDATE carts SET items_ids = '${JSON.stringify(ids)}' WHERE id = ${userId}`
                                    this.db.query(sql, (err, result) => {
                                        if (err) throw err;
                                        return resolve(true);
                                    })
                                })
                            }
                        })

                    })
                    })
                })
            })
    }


    // Доставка

    getUserDelivery(id) {
        const sql = `SELECT deliveries.delivery_items_ids FROM deliveries WHERE id = ${id}`;
        return new Promise((resolve => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(JSON.parse(result[0].delivery_items_ids));
            })
        }))
    }

    getDeliveryItem(deliveryItemId){
        const sql = `SELECT * FROM delivery_items WHERE id = ${deliveryItemId}`;
        return new Promise((resolve => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(result[0]);
            })
        }))
    }

    getDeliveryStatusName(deliveryStatusId){
        const sql = `SELECT statuses.name FROM statuses WHERE id = ${deliveryStatusId}`;
        return new Promise((resolve => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(result[0].name);
            })
        }))
    }
    // Получаем массив из вещей корзины по id пользователя
    getUserDeliveryItems (userId) {
        return new Promise((resolve, reject) => {
            this.getUserDelivery(userId).then(items => {
                const itemsArray = [];
                if (items.length === 0) {
                    resolve(itemsArray);
                }
                for (let i = 0; i<items.length; i++) {
                    this.getDeliveryItem(items[i]).then(item => {
                        console.log('here2')
                        this.getItemObject(item).then(result => {
                            this.getDeliveryStatusName(item.status_id).then(statusName => {
                                const itemObj = {};
                                itemObj.image = JSON.parse(result.images)[0];
                                itemObj.count = item.count;
                                itemObj.id = item.id;
                                itemObj.name = result.name;
                                itemObj.size_name = result.size_name;
                                itemObj.price =  result.price * item.count;
                                itemObj.status = statusName;
                                itemsArray.unshift(itemObj);
                                if (i === items.length - 1) {
                                    // Возвращаем массив из объектов корзины
                                    resolve(itemsArray);
                                }
                            })
                        })
                    })
                }
            })
        })
    }

    // Получаем все инфу из cart_items по id
    getUserCartItemsFromTable(itemId) {
        const sql = `SELECT * FROM cart_items WHERE id = ${itemId}`;
        return new Promise((resolve => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(result[0]);
            })
        }))
    }

    makeDeliveryItem (cartItem) {
        const sql = `INSERT INTO delivery_items (product_type_id, product_id, sizes_counts_id, count, status_id) 
                        VALUES (${cartItem.product_type_id}, ${cartItem.product_id}, ${cartItem.sizes_counts_id}, ${cartItem.count}, 2)`
        return new Promise((resolve => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(result.insertId);
            })
        }))
    }


    changeUserDeliveryIds (userId, newDeliveryIds) {
        const sql = `UPDATE deliveries SET delivery_items_ids = '${JSON.stringify(newDeliveryIds)}' WHERE id = ${userId}`
        return new Promise((resolve => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(result[0]);
            })
        }))
    }


    subItemCount (item) {
        const sql = `UPDATE sizes_counts SET count = count-${item.count} WHERE id = ${item.sizes_counts_id}`
        return new Promise((resolve => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(result[0]);
            })
        }))
    }

    addCartItemsInDelivery(userId) {
        return new Promise((resolve, reject) => {
            this.getUserDelivery(userId).then(oldItemsIds => {
                this.getUserCart(userId).then(items => {
                    if (items.length === 0)
                        return reject("В корзине нет вещей");
                    const newDeliveryItemsIds = [];
                    items.forEach((itemId, ind) => {
                        this.getUserCartItemsFromTable(itemId)
                            .then(item => {
                                // Уменьшаем количество вещей на складе
                                this.subItemCount(item).then(()=>{
                                    // Создаем delivery вещь
                                    this.makeDeliveryItem(item).then(deliveryItemId => {
                                        newDeliveryItemsIds.push(deliveryItemId);
                                        this.deleteUserItemFromTable(itemId).then(() => {
                                            // Удаляем вещь из корзины пользователя
                                            if (ind === items.length - 1) {
                                                // Очищаем корзину пользователя
                                                this.deleteUserItems(userId, itemId).then(()=>{
                                                    oldItemsIds = oldItemsIds.concat(newDeliveryItemsIds);
                                                    this.changeUserDeliveryIds(userId, oldItemsIds).then(()=> {
                                                        return resolve(true)
                                                    });
                                                })
                                            }
                                        })
                                    })
                                })

                            })
                    })
                })
            })

        })
    }

    addCountInSizesCounts(sizesCountsId, addedCount) {
        const sql = `UPDATE sizes_counts SET count = count + ${addedCount} WHERE id = ${sizesCountsId}`
        return new Promise((resolve => {
            this.db.query(sql, (err, result) => {
                if (err) throw err;
                return resolve(true);
            })
        }))
    }

    cancelDeliveryItem(userId, itemId) {
        return new Promise(resolve => {
            this.getDeliveryItem(itemId).then(item => {
                // Возврат товара на склад
                this.addCountInSizesCounts(item.sizes_counts_id, item.count).then(()=>{
                    // Смена статуса на отменен
                    const sql = `UPDATE delivery_items SET status_id = 3 WHERE id=${itemId}`;
                    this.db.query(sql, (err, result) => {
                        if (err) throw err;
                        return resolve(true);
                    })
                })

            })

        })
    }


    endConnection(){
        this.db.end();
    }

}

module.exports = Database;
