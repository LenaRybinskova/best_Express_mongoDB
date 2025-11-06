import app from '../src/app';
import type {ServerOptions} from 'node:https'
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const {APP_PORT, DB_HOST, DB_PORT, DB_NAME} = process.env

const options: ServerOptions = {
    key: fs.readFileSync('.ssl/key.pem'),
    cert: fs.readFileSync('.ssl/cert.pem'),
};

const start = async () => {
    try {
        https.createServer(options, app).listen(APP_PORT, () => {
            console.log(`Сервер запущен на https://localhost:${APP_PORT}`)
        })

        const db = await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
        console.log(`MongoDB ${db.connection.name} подключена`)

    } catch (err) {
        console.error('Failed to start the application')
        console.error('Catch err:', err)
        /*        process.exit(1)*/
    }
}

process.on('SIGINT', async () => {
    await mongoose.disconnect()
    console.log('App closed')
    process.exit()
})

start()
