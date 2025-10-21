import {Types} from 'mongoose';
import {UserRole} from 'models/users/users.model';

export type UpdateUser = {
    firstName?: string;
    lastName?: string;
    login?: string;
    password?: string;
    email?: string;
    avatar?: string;
    experience?: number;
    role?: UserRole;
    availableCourses?: Types.ObjectId[];
    authorCourses?: Types.ObjectId[];
    commentsId?: Types.ObjectId[]
}