import {
    addFilesLessonDTO,
    addLinksLessonDTO,
    CreateLessonWithID,
    deleteFileLessonDTO, deleteLinkLessonDTO,
    UpdateLessonDTO
} from '../lessons/lesson.types';
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

    async delete(lessonId: string) {
        try {
            const result = await LessonModel.findByIdAndDelete(lessonId)

            if (!result || null) {
                throw new Error('NOT_FOUND')
            }

            return result
        } catch (error) {
            throw handleMongoError(error)
        }

    }

    async update(dto: UpdateLessonDTO, lessonId: string) {
        try {
            const result = await LessonModel.findByIdAndUpdate(
                lessonId,
                {
                    $set: {
                        title: dto?.title,
                        description: dto?.description,
                        startedAt: dto?.startedAt,
                        'resources.video.url': dto?.resources?.video?.url,
                        'resources.video.duration': dto?.resources?.video?.duration,
                        'resources.video.thumbnail': dto?.resources?.video?.thumbnail,
                    }
                },
                {new: true, runValidators: true}
            );

            return result;
        } catch (error) {
            throw handleMongoError(error);
        }
    }


    // метод для добавления в ресурсы файлы и ссылки, одну или некс штук
    async addResources(lessonId: string, fieldResource: string, payload: addFilesLessonDTO | addLinksLessonDTO) {
        try {
            const updatedLesson = LessonModel.findByIdAndUpdate(lessonId, {
                $push: {
                    [fieldResource]: {$each: payload}
                },
            }, {new: true, runValidators: true})

            return updatedLesson

        } catch (error) {
            throw handleMongoError(error);
        }
    }

    // метод проверки, что такой ресурс(файлиили линк) существует в Уроке
    async isResourceExist(lessonId: string, fieldResource: string, fileName: string) {
        try {
            const isResourceExist = await LessonModel.exists({_id: lessonId, [fieldResource]: fileName})

            if (!isResourceExist || null) {
                throw new Error('NOT_FOUND')
            }

            return isResourceExist;
        } catch (error) {
            throw handleMongoError(error);
        }
    }


    // метод для удаленияиз Ресурсов файлов и ссылок по 1 шт по их названию
    async deleteResources(lessonId: string, fieldResource: string, fileName: string) {
        try {

            await this.isResourceExist(lessonId, fieldResource, fileName)
            const res = await LessonModel.findByIdAndUpdate(lessonId, {
                $pull: {
                    [fieldResource]: fileName
                },

            }, {new: true, runValidators: true})

            return res

        } catch (error) {
            throw handleMongoError(error);
        }
    }

}