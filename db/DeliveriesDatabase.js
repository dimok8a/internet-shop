const Database = require('./Database')

class DeliveriesDatabase extends Database {

    constructor() {
        super();
        this.db = super.getInstance();
    }

    addCartItemsInDelivery(userId) {
        const sql = `INSERT INTO delivery_items (clothe_id, size_id, user_id, count) SELECT clothe_id, size_id, user_id, count FROM cart_items WHERE user_id=${userId}`
        return super.query(sql);
    }

    removeCartItems(userId) {
        const sql = `DELETE FROM cart_items WHERE user_id=${userId};`
        return super.query(sql);
    }

    async getUserDeliveryItems(id) {
        const sql = `SELECT 
                delivery_items.id, 
                clothes.price, 
                clothes.name, 
                sizes.name as size, 
                delivery_items.count, 
                images.link as image,
                statuses.name as status
                FROM delivery_items, clothes, sizes, images, statuses
                WHERE delivery_items.user_id = ${id} 
                AND clothes.id = delivery_items.clothe_id
                AND sizes.id = delivery_items.size_id
                AND images.clothe_id = clothes.id
                AND statuses.id = status_id
                GROUP BY (delivery_items.id)
                `
        return await super.query(sql);
    }


    async changeStatus(deliveryId, status) {
        const sql = `UPDATE delivery_items SET status_id = ${status} WHERE id = ${deliveryId}`
        return await super.query(sql);
    }
}


module.exports = DeliveriesDatabase
