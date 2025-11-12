import {LessonRepository} from '../lessons/lesson.repository';
import {CreateLessonDTO} from '../lessons/lesson.types';
import {CourseRepository} from '../courses/courses.repository';
import {Types} from 'mongoose';

export class LessonService {
    constructor(private readonly lessonRepository: LessonRepository,
                private readonly courseRepository: CourseRepository) {}

    async create(dto: CreateLessonDTO, courseId: string, authorId:string) {
        const data = {...dto, courseId, authorId}
        const courseIDType = new Types.ObjectId(courseId)
/*        const userIDType = new Types.ObjectId(authorId)*/
        const newlesson = await this.lessonRepository.create(data);
        console.log('LessonService newlesson:', newlesson)

        await this.courseRepository.addIdWithRef(courseIDType, 'lessonsId', newlesson._id)
        return newlesson
    }
}