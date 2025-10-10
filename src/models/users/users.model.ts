import { model, Schema } from 'mongoose'


const userSchema = new Schema({})

export const UserModel = model('User', userSchema)