import {model, Schema, Types} from 'mongoose'


export interface IComment extends Document {
    authorId: Types.ObjectId
    courseId: Types.ObjectId
    dataPublish: Date
    text: string
    createdAt: Date
    updatedAt: Date
}

const commentSchema = new Schema<IComment>({
    authorId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    courseId: {type: Schema.Types.ObjectId, required: true, ref: 'Course'},
    dataPublish: {type: Date, required: true},
    text: {type: String, required: true, maxlength: [1000, 'Комментарий не может быть длиннее 100 символов']},
}, {timestamps: true})

export const CommentModel = model('Comment', commentSchema)