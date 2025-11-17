import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { LessonModel } from '../src/moduls/lessons/lessons.model';

dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

async function migrateLessonVideo() {
    try {
        await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
        console.log(' Connected to MongoDB');

        const result = await LessonModel.updateMany(
            {
                "resources.video": { $type: "string" } // нашли где видео просто строка
            },
            {
                $set: {
                    "resources.video": {
                        url: "$resources.video", // перенесли ввылку видео которая была, на остальные поля дефолтные
                        duration: 0,
                        thumbnail: ""
                    }
                }
            }
        );

        console.log(`Миграция завершена! Обновлено документов: ${result.modifiedCount}`);

    } catch (error) {
        console.error('Ошибка миграции:', error);
    } finally {
        await mongoose.disconnect();
        console.log(' Disconnected from MongoDB');
    }
}

migrateLessonVideo();