import {CourseRepository} from './courses.repository';
import {ICourse} from '../courses/courses.model';
import {UpdateCourseInput} from 'models/courses/courses.types';
import {Types} from 'mongoose';


export class CoursesService {

    constructor(private courseRepository: CourseRepository) {
    }

    async getAllCourses() {
        return await this.courseRepository.getAllCourses();
    }

    async getCourseById(id: Types.ObjectId) {
        return await this.courseRepository.getCourseById(id)
    }

    async create(data: ICourse) {
        return await this.courseRepository.create(data)
    }

    async update(currentUserId: Types.ObjectId, courseId: Types.ObjectId, courseData: UpdateCourseInput) {
        return await this.courseRepository.update(currentUserId, courseId, courseData)
    }

    async delete(courseId: string, currentUserId: string) {
        return await this.courseRepository.delete(courseId, currentUserId)
    }
}
