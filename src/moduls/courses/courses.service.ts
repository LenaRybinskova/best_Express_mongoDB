import {CourseRepository} from './courses.repository';
import {ICourse} from '../courses/courses.model';
import {CreateCourseDTO, UpdateCourseDTO} from 'moduls/courses/courses.types';
import {Types} from 'mongoose';
import {UserRepository} from '../users/users.repository';


export class CoursesService {

    constructor(private courseRepository: CourseRepository,
                private userRepository: UserRepository) {
    }

    // метод для проверки: авторизовавшийся юзер это автор курса или роль="admin"?
    async checkAccessCourse(courseId: Types.ObjectId, currentUserId: string | Types.ObjectId): Promise<ICourse> {

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
        return await this.courseRepository.getAllCourses();
    }

    async getCourseById(id: Types.ObjectId) {
        return await this.courseRepository.getCourseById(id)
    }

    async create(data: CreateCourseDTO) {
        return await this.courseRepository.create(data)
    }

    async update(authUserId: Types.ObjectId, courseId: Types.ObjectId, courseData: UpdateCourseDTO) {
        await this.checkAccessCourse(courseId, authUserId)
        return await this.courseRepository.update(courseId, courseData)
    }

    async delete(authUserId: Types.ObjectId, courseId: Types.ObjectId) {
        await this.checkAccessCourse(courseId, authUserId)
        return await this.courseRepository.delete(authUserId, courseId)
    }
}
