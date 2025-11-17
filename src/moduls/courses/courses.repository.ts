import {CourseModel, ICourse} from '../courses/courses.model';
import {handleMongoError} from '../../utils/handleError/mongoDBErrorHandle';
import {CreateCourseDTO, UpdateCourseDTO} from '../courses/courses.types';
import {Types} from 'mongoose';
import {UserRepository} from '../users/users.repository';


export class CourseRepository {
    constructor(private userRepository: UserRepository) {
    }

    async getAllCourses() {
        try {
            return await CourseModel.find({}).select('-authorId -ratingStat -ratingCount -ratingCount -studentsId')
        } catch (error) {
            throw handleMongoError(error)
        }
    }

    async getCourseById(id: Types.ObjectId) {
        try {
            const course = await CourseModel.findById(id).select('-ratingStat -ratingCount -ratingCount -studentsId').populate('lessonsId')

            if (course === null) {
                throw new Error('NOT_FOUND')
            }

            return course
        } catch (error) {
            throw handleMongoError(error)
        }
    }

    async create(courseData: CreateCourseDTO) {
        try {
            console.log('create:', courseData)
            return await CourseModel.create(courseData);
        } catch (error) {
            throw handleMongoError(error)
        }
    }

    async update(courseId: Types.ObjectId, courseData: UpdateCourseDTO) {
        try {
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

    async delete(authUserId: Types.ObjectId, courseId: Types.ObjectId) {
        try {
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

// метод для добавления в ссылочные поля новых Ид Уроков, Комментариев, Студентов
    async addIdWithRef(courseId: Types.ObjectId, nameFiendID: string, id: Types.ObjectId) {
        try {
            console.log('addIdWithRe 111111111')
            return await CourseModel.findByIdAndUpdate(
                courseId,
                {
                    $push: {
                        [nameFiendID]: id  // в какое поле добавляем новосозданный Ид? ,
                        // например в lessonsId добавляем только что созданный в LesssonRepo лессонИд.
                    }
                },
                {new: true}
            );
        } catch (error) {
            throw handleMongoError(error)
        }
    }


    async deleteIdWithRef(courseId: string, nameFiendID: string, id: string) {
        try {
            return await CourseModel.findByIdAndUpdate(
                courseId,
                {
                    $pull: {
                        [nameFiendID]: id
                    }
                },
                {new: true}
            );
        } catch (error) {
            throw handleMongoError(error)
        }
    }

    // метод для проверки принадлежит ли Ид урока к курсу
    async checkIDLessonInCourse(courseId: string, lessonId: string) {
        try {
            //явно указываем что идУрока искать в массиве lessonsId
            const isLessonExist = CourseModel.findOne({_id: courseId, lessonsId: { $in: [lessonId] }})

            if (!isLessonExist) {
                throw new Error('NOT_FOUND')
            }
            return true
        } catch (error) {
            throw handleMongoError(error)
        }
    }
}