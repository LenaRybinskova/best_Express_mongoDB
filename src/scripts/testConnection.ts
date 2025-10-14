import mongoose from 'mongoose';
import {UserModel} from '../models/users/users.model';
import {CourseModel} from '../models/courses/courses.model';
import dotenv from 'dotenv';
dotenv.config();

const {DB_HOST, DB_PORT, DB_NAME} = process.env

const testConnection = async () => {
    try {
        await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

        const newUser = await UserModel.create({
            login: 'LenaTest',
            email: 'LenaTest@test.com',
            password: 'qwerty',
        });

        console.log('newUser готов:', newUser);

        const prepCourseData = {
            authorId:newUser._id,
            title:"Node.js",
            description:"description Node.js",
            startedAt: new Date(),
            endedAt: new Date(),
            price:100,
        }
        const newCourse = await CourseModel.create(prepCourseData);
        console.log('newCourse готов:', newCourse);

    } catch (error) {
        console.error('catch Ошибка:', error);
    }
};

testConnection();