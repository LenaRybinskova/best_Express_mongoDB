import {IUser, USER_ROLE, UserModel} from './users.model';
import {handleMongoError} from '../../utils/mongoDBErrorHandle';
import {UpdateCourseInput, UserWithoutPassword} from '../users/user.types';
import {Types} from 'mongoose';

export class UserRepository {

    // метод для проверки - текущ юзер это он сам или админ?
    async isAccess(authUserId: string, userId: string | Types.ObjectId) {

        const isOwnProfile = userId == authUserId

        const authUserRole: UserWithoutPassword | null = await this.getById(authUserId)
        const isAdmin = authUserRole?.role === USER_ROLE.ADMIN;

        if (!isOwnProfile && !isAdmin) {
            throw new Error('FORBIDDEN');
        }

        return true;
    }

    async getAllUsers() {
        try {
            return await UserModel.find({}).select('-password')
        } catch (error: any) {
            throw handleMongoError(error)
        }
    }

    async getById(id: string) {
        try {
            return await UserModel.findById(id).select('-password')
        } catch (error: any) {
            throw handleMongoError(error)
        }
    }

    async update(authUserId:string, id: string, payload: UpdateCourseInput) {
        try {
           await this.isAccess(authUserId, id)

            const updatedUser = await UserModel.findByIdAndUpdate(id, payload,
                {
                    new: true, // в ответе будет юзер с обновл данными
                    runValidators: true // еще раз валидацию по схеме прогонит
                }
            ).select('-password');

            return updatedUser;
        } catch (error) {
            throw handleMongoError(error)
        }
    }

    async delete(authUserId:string,id: string) {
        try {
            await this.isAccess(authUserId, id)

            return await UserModel.findByIdAndDelete(id).select('-password');
        } catch (error) {
            console.log('1')
            throw handleMongoError(error)
        }
    }
}