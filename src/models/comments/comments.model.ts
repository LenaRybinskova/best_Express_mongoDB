import { model, Schema } from 'mongoose'


const commentSchema = new Schema({})

export const UserModel = model('Comment', commentSchema)