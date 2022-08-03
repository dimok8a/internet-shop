const Database = require('./Database')

class CartsDatabase extends Database {

    constructor() {
        super();
        this.db = super.getInstance();
    }

    async getUserCartItems(id) {
        const sql = `SELECT 
                cart_items.id, 
                clothes.price, 
                clothes.name, 
                sizes.name as size, 
                cart_items.count, 
                images.link as image,
                sizes_counts.count as max_count
                FROM cart_items, clothes, sizes, images, sizes_counts
                WHERE cart_items.user_id = ${id} 
                AND clothes.id = cart_items.clothe_id
                AND sizes.id = cart_items.size_id
                AND images.clothe_id = clothes.id
                AND sizes_counts.clothe_id = clothes.id
                AND sizes_counts.size_id = cart_items.size_id
                GROUP BY (cart_items.id)
                `
        return await super.query(sql);
    }

    async changeItemCount(userId, itemId, newCount) {
        const sql = `UPDATE cart_items SET count = ${newCount} WHERE user_id = ${userId} AND id = ${itemId}`;
        return this.db.query(sql);
    }

    async getItemById(itemId) {
        const sql = `SELECT cart_items.id, price, count FROM cart_items, clothes WHERE cart_items.id = ${itemId} AND clothes.id = clothe_id`
        return await super.query(sql);
    }

    // add item in user cart by clothe_id
    async addItemInCart(clotheId, sizeId, userId) {
        const sql = `INSERT INTO cart_items (clothe_id, size_id, user_id) VALUES (${clotheId}, ${sizeId}, ${userId})`
        return await super.query(sql);
    }

    // get item sizes from user cart by clothe_id
    async getItemInCart(clotheId, userId) {
        const sql = `SELECT GROUP_CONCAT (size_id SEPARATOR ', ') AS sizes FROM cart_items WHERE clothe_id = ${clotheId} AND user_id = ${userId}`
        return (await super.query(sql))[0];
    }

    async deleteItemFromCart(cartItemId) {
        const sql = `DELETE FROM cart_items WHERE id = ${cartItemId}`
        return await super.query(sql);
    }


}


module.exports = CartsDatabase
