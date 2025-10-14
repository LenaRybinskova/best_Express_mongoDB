import {CourseRepository} from './courses.repository';


export class CoursesService {

    constructor( private courseRepository: CourseRepository) {}

    async getAllCourses() {
        return await this.courseRepository.getAllCourses();
    }

}