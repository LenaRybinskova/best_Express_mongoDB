import {CourseModel, ICourse} from '../courses/courses.model';
import {handleMongoError} from '../../utils/mongoDBErrorHandle';
import {UpdateCourseInput} from '../courses/courses.types';
import {Types} from 'mongoose';
import {USER_ROLE, UserModel} from '../users/users.model';


export class CourseRepository {

    // метод для проверки  -текущ юзер это автор курса или админ?
    async checkAccessCourse(courseId: string | Types.ObjectId, currentUserId: string | Types.ObjectId, accessLevel?: typeof USER_ROLE): Promise<ICourse> {

        const [course, user] = await Promise.all([
            this.getCourseById(courseId),
            UserModel.findById(currentUserId)
        ]);
        const isUserAuthor = course.authorId.toString() === currentUserId.toString()

        const isAdmin = user?.role as string === 'admin';

        if (!isUserAuthor && !isAdmin) {
            throw new Error('FORBIDDEN');
        }

        return course;
    }

    async getAllCourses() {
        try {
            return await CourseModel.find({}).select('-authorId -ratingStat -ratingCount -ratingCount -studentsId')
        } catch (error) {
            throw handleMongoError(error)
        }
    }

    async getCourseById(id: string | Types.ObjectId) {
        try {
            const course = await CourseModel.findById(id).select('-ratingStat -ratingCount -ratingCount -studentsId')

            if (course === null) {
                throw new Error('NOT_FOUND')
            }

            return course
        } catch (error) {
            throw handleMongoError(error)
        }
    }

    async create(courseData: ICourse) {
        try {
            return await CourseModel.create(courseData);
        } catch (error) {
            throw handleMongoError(error)
        }
    }

    async update(currentUserId: Types.ObjectId, courseId: Types.ObjectId, courseData: UpdateCourseInput) {
        try {
            // проверка, админ или автор'?
            await this.checkAccessCourse(courseId, currentUserId);

            return await CourseModel.findByIdAndUpdate(courseId, courseData,
                {
                    new: true, // в ответе будет курс с обновл данными
                    runValidators: true // еще раз валидацию по схеме прогонит
                }
            )

        } catch (error) {
            throw handleMongoError(error)
        }
    }

    async delete(courseId: string, currentUserId: string) {
        try {
            // проверка, админ или автор'?
            await this.checkAccessCourse(courseId, currentUserId);

            const result = await CourseModel.findByIdAndDelete(courseId);
            if (!result || null) {
                throw new Error('NOT_FOUND')
            }

            return result;
        } catch (error) {
            throw handleMongoError(error)
        }
    }
}