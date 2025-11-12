import {model, Schema, Types} from 'mongoose'


export interface ILesson extends Document {
    authorId: Types.ObjectId
    title: string
    description: string
    startedAt: Date
    commentsId?: Types.ObjectId[]
    studentsId?: Types.ObjectId[]
    resources: {
        files: string[]
        video: string
        resourceLink: string[]
    }
    createdAt: Date
    updatedAt: Date
}

const lessonSchema = new Schema<ILesson>({
    authorId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true, maxlength: [100, 'Название не может быть длиннее 100 символов']},
    description: {type: String, required: true, maxlength: [500, 'Описание не может быть длиннее 500 символов']},
    startedAt: {type: Date, required: true},
    commentsId: [{type: Schema.Types.ObjectId, ref: 'Comment', required: false}],
    studentsId: [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    resources: {
        type:
            {
                files: [{type: [String], default: []}],
                video: {type: String, default: "", required: false},
                resourceLink: {type: [String],  default: [], required: false},
            },
        default: {}
    }
}, {timestamps: true})

export const LessonModel = model('Lesson', lessonSchema)