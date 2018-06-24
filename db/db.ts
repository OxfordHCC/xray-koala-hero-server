import * as pg from 'pg';
import { User } from '../util/types';

export class DB {

    pool : pg.Pool;

    constructor(role : {user : string, password: string}) {

        const config = require('../config/config');
        const db_config = config.db;

        db_config.user = role.user;
        db_config.password = role.password;

        db_config.max = 10;
        db_config.idleTimeoutMillis;

        this.pool = new pg.Pool(db_config);
        this.pool.on('error', (err) => {
            console.log("Client Error:", err.message, err.stack);
        })
    }

    async query(text : string, values : any[]) {
        try {
            if (values){
                console.log('query:', text, values);
            }
            else {
                console.log(`query: ${text}`);
            }
            return this.pool.query(text, values);
        }
        catch(err) {
            console.log('Error with pg query');
            throw err;
        }
    }

    async selectByEmail(email : string) {
        try{
            let ret: pg.QueryResult =
                await this.query('select * from users where email = $1', [email]);
            return ret.rows[0];

        } catch(err) {
            console.log(`Error selecting user for email: ${email}, Error: ${err}`);
        }
    }

    async insertUser(user : User) {
        try {
            let selectedUser : User = await this.selectByEmail(user.email);
            if(selectedUser) {
                console.log(`User with email: ${user.email} already exists.`);
                return;
            }
            await this.query(
                'insert into users(email, password_hash, last_auth, date_created) values ($1, $2, now(), now())',
                [user.email, user.hashed_password]
            );
        }
        catch(err) {
            console.log(`Error inserting user details inserted for email: ${user.email}, Error: ${err}`);
            throw err;
        }
    }
}