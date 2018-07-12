import * as pg from 'pg';
import { User, Interaction, PhoneInformation, AudioInformation } from '../util/types';
import * as fs from 'fs';
import * as base64 from 'base-64';
export class DB {

    pool : pg.Pool;
    config : any;

    constructor(role : {user : string, password: string}) {

        this.config = require('../config/config');
        const db_config = this.config.db;

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
                [user.email, user.password_hash]
            );
        }
        catch(err) {
            console.log(`Error inserting user details inserted for email: ${user.email}, Error: ${err}`);
            throw err;
        }
    }

    async saveAudioFile(audioInfo : AudioInformation) {
        let dir : string = this.config.audio.out_dir + audioInfo.study_id + '/';
        let fp : string = dir +
            this.config.audio.file_prefix +
            audioInfo.study_id +
            '_' +
            audioInfo.date +
            this.config.audio.file_suffix +
            '.mp4';
        if(!fs.existsSync(this.config.audio.out_dir)) {
            fs.mkdirSync(this.config.audio.out_dir);
        }
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        let buf = Buffer.from(audioInfo.file_data, 'base64')
        fs.writeFile(fp, buf, async (err) => {
            if(err) {
                console.log(`Error Saving File.\nFile Path:${fp}\nError: ${err}`);
                return;
            }
            console.log(`File was Saved Successfully.\nFile Path: ${fp}`);

            delete audioInfo.file_data;
            audioInfo.file_path = fp;
            await this.insertAudioLog(audioInfo);
        });
    }

    async insertAudioLog(audioInfo : AudioInformation) {
        console.log(`Saving Audio Log Information`);
        try {
            await this.query(
                'insert into audio_recordings(study_id, date, length, file_path) values ($1,$2,$3,$4)',
                [
                    audioInfo.study_id,
                    audioInfo.date,
                    audioInfo.length,
                    audioInfo.file_path
                ]
            );
        }
        catch(err){
            console.log(`Error inserting audio into database. Study ID: ${audioInfo.study_id}, File Location: ${audioInfo.file_path}`);
        }
    }

    async insertInteractionLog(interaction : Interaction) {
        try {
            let selectedUser : User = await this.selectByStudyID(interaction.study_id);
            if(!selectedUser) {
                console.log(`User doesn't exist with studyID: ${interaction.study_id}`);
                return;
            }
            await this.query(
                'insert into interactions (study_id, interaction_type, interaction_datetime, associated_app_id, page_name, additional_data) values ($1,$2,$3,$4,$5,$6)',
                [
                    interaction.study_id,
                    interaction.interaction_type,
                    interaction.interaction_datetime,
                    interaction.associated_app_id,
                    interaction.page_name,
                    interaction.additional_data
                ]
            );
        }
        catch(err) {
            console.log(`Error inserting interaction log details for studyID: ${interaction.study_id}, Error: ${err}`);
            throw err;
        }
    }

    async insertPhoneInfo(phoneInfo : PhoneInformation) {
        try {
            let selectedUser : User = await this.selectByStudyID(phoneInfo.study_id);
            if(!selectedUser) {
                console.log(`User doesn't exist with studyID: ${phoneInfo.study_id}`);
                return;
            }
            await this.query(
                'insert into phone_information(study_id, retrieval_datetime, installed_apps, top_ten_apps) values($1,$2,$3,$4)',
                [
                    phoneInfo.study_id,
                    phoneInfo.retrieval_datetime,
                    phoneInfo.installed_apps,
                    phoneInfo.top_ten_apps
                ]
            );
        }
        catch(err) {
            console.log(`Error inserting Phone info for studyID: ${phoneInfo.study_id}, Error: ${err}`);
            throw err;
        }
    }
}