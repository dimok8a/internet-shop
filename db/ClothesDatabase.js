const Database = require('./Database')

class ClothesDatabase extends Database {

    constructor() {
        super();
        this.db = super.getInstance();
    }

    // id типа одежды по ее ссылке (названию)
    async getClotheTypeId(clotheType) {
        const sql = `SELECT id FROM clothe_types WHERE link = '${clotheType}'`
        const [{id}] = await super.query(sql);
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
        return (await super.query(sql));
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
        if (!result)
            return null;
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
}


module.exports = ClothesDatabase
