import {CreateLessonWithID} from '../lessons/lesson.types';
import {LessonModel} from '../lessons/lessons.model';
import {handleMongoError} from '../../utils/handleError/mongoDBErrorHandle';

export class LessonRepository {
    constructor() {
    }

    async create(data: CreateLessonWithID) {
        try {
            return LessonModel.create(data)
        } catch (error) {
            throw handleMongoError(error)
        }
    }

}