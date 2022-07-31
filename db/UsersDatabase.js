const Database = require('./Database')

class UsersDatabase extends Database {
    constructor() {
        super();
        Object.setPrototypeOf(this, UsersDatabase.prototype); // <-------
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

    async loginUser(email, phone, token) {
        const sql = `UPDATE users SET token = '${token}'`  + 'WHERE `e-mail` =' + `'${email}' OR phone_number = '${phone}'`
        return (await super.query(sql));
    }

}

module.exports = UsersDatabase
