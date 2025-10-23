import {model, Schema, Types} from 'mongoose'


export const USER_ROLE = {
    ADMIN: 'Admin',
    AUTHOR: 'Author',
    USER: 'User',
} as const;

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

export interface IUser extends Document {
    login: string;
    password: string;
    email: string;

    firstName?: string;
    lastName?: string;
    avatar?: string;
    experience?: number;
    role?: UserRole;
    availableCourses?: Types.ObjectId[];
    authorCourses?: Types.ObjectId[];
    commentsId?:Types.ObjectId[]
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    login: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String,lowercase: true, required: true, unique: true },

    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    avatar: { type: String, required: false },
    experience: { type: Number, required: false },
    role: { type: String, enum: Object.values(USER_ROLE), default: USER_ROLE.USER },
    availableCourses:[{type: Schema.Types.ObjectId, ref: 'Course'}],  //доступные курсы [id, id]
    authorCourses:[{type:Schema.Types.ObjectId, ref: 'Course'}],      //является автором курсов[id, id]
    commentsId: [{type:Schema.Types.ObjectId, ref: 'Comment'}], //все его комментарии [id, id]

},{timestamps: true})

export const UserModel = model('User', userSchema)