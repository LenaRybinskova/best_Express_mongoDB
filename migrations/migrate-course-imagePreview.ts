import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CourseModel } from '../src/moduls/courses/courses.model';


dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

async function migrateLessonVideo() {
    try {
        await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
        console.log(' Connected to MongoDB');

        const result = await CourseModel.updateMany(
            {}, // все документы
            {
                $set: {
                    imagePreview: "" // устанавливаем пустую строку по умолчанию
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