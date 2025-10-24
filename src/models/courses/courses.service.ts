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
    async update(authUserId: string, courseId: string, courseData: UpdateCourseInput) {
        return await this.courseRepository.update(authUserId, courseId, courseData)
    }
    async delete(authUserId: string, courseId: string) {
        return await this.courseRepository.delete(authUserId, courseId)
    }
}
