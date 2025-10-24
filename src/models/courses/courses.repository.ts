import {CourseModel, ICourse} from '../courses/courses.model';
import {handleMongoError} from '../../utils/mongoDBErrorHandle';
import {UpdateCourseInput} from '../courses/courses.types';
import {Types} from 'mongoose';
import {UserRepository} from '../users/users.repository';


export class CourseRepository {
    constructor(private userRepository: UserRepository) {}
    // метод для проверки: авторизовавшийся юзер это автор курса или роль="admin"?
    async checkAccessCourse(courseId: string | Types.ObjectId, currentUserId: string | Types.ObjectId): Promise<ICourse> {

        const [course, user] = await Promise.all([
            this.getCourseById(courseId),
            this.userRepository.getById(currentUserId.toString())
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
            console.log('create:', courseData)
            return await CourseModel.create(courseData);
        } catch (error) {
            throw handleMongoError(error)
        }
    }
    async update(authUserId: string, courseId: string, courseData: UpdateCourseInput) {
        try {
            // проверка, админ или автор'?
            await this.checkAccessCourse(courseId, authUserId);

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
    async delete(authUserId: string, courseId: string) {
        try {
            // проверка, админ или автор'?
            await this.checkAccessCourse(courseId, authUserId);

            const result = await CourseModel.findByIdAndDelete(new Types.ObjectId(courseId));
            if (!result || null) {
                throw new Error('NOT_FOUND')
            }

            return result;
        } catch (error) {
            console.log('MONGODB ERROR:', error)
            throw handleMongoError(error)
        }
    }
}