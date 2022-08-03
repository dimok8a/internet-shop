const mysql = require('mysql2/promise')
const Importer = require('mysql-import');

const [host, user, password, database] = ['localhost', 'root', "", 'internet_shop']
class Database {

    getInstance() {
        if (Database.exists) {
            return Database.instance.db;
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
        await db.query(`CREATE DATABASE IF NOT EXISTS ${database}`)
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


    endConnection(){
        this.db.end();
    }

}


module.exports = Database
