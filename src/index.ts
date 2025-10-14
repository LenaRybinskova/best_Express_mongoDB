import app from '../src/app';
import type { ServerOptions } from 'node:https'
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const { APP_PORT} = process.env

const options: ServerOptions = {
    key: fs.readFileSync('.ssl/key.pem'),
    cert: fs.readFileSync('.ssl/cert.pem'),
};

https.createServer(options, app).listen(APP_PORT, () =>
    console.log(`Сервер запущен на https://localhost:${APP_PORT}`))


