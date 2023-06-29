const { Client } = require('pg');

require('dotenv')
    .config();

class Database {
    constructor() {
        this.client = new Client({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });

        this.client.connect();
    }

    authenticate = async () => {
        try {
            await this.client.query(`SELECT * FROM schema_shop.table_user`);
            await this.client.end;

            console.log('Database success connected');
        } catch (error) {
            console.log(`Fail to connect database\n${error}`);
        }


    }

    sendQuery = async (queryString) => {
        let temp;
        await this.client.query(queryString, (err,data) => temp = data);
        return temp; 
    }
}

module.exports = Database;