import { model, Schema } from 'mongoose'


const coursesSchema = new Schema({})

export const CoursesModel = model('Courses', coursesSchema)