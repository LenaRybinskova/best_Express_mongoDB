import { model, Schema } from 'mongoose'


const lessonSchema = new Schema({})

export const UserModel = model('Lesson', lessonSchema)