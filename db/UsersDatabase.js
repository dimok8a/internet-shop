const Database = require('./Database')

class UsersDatabase extends Database {
    constructor() {
        super();
        this.db = super.getInstance();
    }
    // Возврат пользователя по email
    async getUserByEmailOrNumber(email, phone) {
        const sql = 'SELECT * FROM users WHERE `e-mail` = ' + `'${email}' OR phone_number = "${phone}"`
        // Возвращаем первого пользователя
        return (await super.query(sql))[0];
    }
    // Возвращает id только что созданного пользователя
    async registerUser(email, name, phone, address, hash, token) {
        const sql = 'INSERT INTO users (`e-mail`, name, phone_number, address, hash, token)' +
            ` VALUES ('${email}', '${name}', '${phone}', '${address}', '${hash}', '${token}')`
        return (await super.query(sql))['insertId'];
    }

    // Set token to user by email or phone
    async loginUser(phone, token) {
        const sql = `UPDATE users SET token = '${token}'`  + `WHERE phone_number = '${phone}'`
        return (await super.query(sql));
    }

    async getUserById(id) {
        const sql = `SELECT * FROM users WHERE id = ${id}`
        return (await super.query(sql))[0];
    }

    async getUserByEmail(email) {
        const sql = 'SELECT * FROM users WHERE `e-mail` =' + `'${email}'`
        return (await super.query(sql))[0];
    }

    async getUserByPhone(phone) {
        const sql = `SELECT * FROM users WHERE phone_number = '${phone}'`
        return (await super.query(sql))[0];
    }

    // change user info (name, e-mail, address)
    async changeUserData(id, newName, newEmail, newAddress) {
        const sql = `UPDATE users SET 
                    name = '${newName}', 
                    address = '${newAddress}',` +
                    ' `e-mail`' + ` = '${newEmail}' 
                    WHERE id = ${id}`;
        return (await super.query(sql))[0];
    }

    async userExit(id) {
        const sql = `UPDATE users SET token = NULL WHERE id = ${id}`
        return (await super.query(sql))[0];
    }

}

module.exports = UsersDatabase
