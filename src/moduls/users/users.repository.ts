import {SoftDeleteUser, USER_ROLE, UserModel} from './users.model';
import {handleMongoError} from '../../utils/handleError/mongoDBErrorHandle';
import { UserWithoutPassword} from '../users/user.types';
import { UpdateCourseDTO,} from '../courses/courses.types';
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

    // метод для проверки - юзер действующий или "удален" ?
    async isActiveUser(userId: string | Types.ObjectId) {
        const user = await UserModel.findById(userId)
        return user?.isActive === true;
    }

    async getAllUsers() {
        try {
            return await UserModel.find({isActive: true})
        } catch (error: any) {
            throw handleMongoError(error)
        }
    }

    async getById(id: string) {
        try {
            return await UserModel.findById(id)
        } catch (error: any) {
            throw handleMongoError(error)
        }
    }

    async update(authUserId: string, id: string, payload: UpdateCourseDTO) {
        try {
            await this.isAccess(authUserId, id)

            const updatedUser = await UserModel.findByIdAndUpdate(id, payload,
                {
                    new: true, // в ответе будет юзер с обновл данными
                    runValidators: true // еще раз валидацию по схеме прогонит
                }
            )

            return updatedUser;
        } catch (error) {
            throw handleMongoError(error)
        }
    }

    async delete(authUserId: string, id: string, payload: SoftDeleteUser) {
        try {
            await this.isAccess(authUserId, id)

            //если у польз уже isActive=false ( как бы его удалили) - то вернем ошибку
            if ( !this.isActiveUser(id)) {
                throw new Error('NOT_FOUND');
            }

            /*            return await UserModel.findByIdAndDelete(id).select('-password -isActive ');*/

            const softDeleteduser = await UserModel.findByIdAndUpdate(id, payload,
                {
                    new: false, // в ответе будет юзер с обновл данными
                    runValidators: true // еще раз валидацию по схеме прогонит
                })

            return softDeleteduser

        } catch (error) {
            throw handleMongoError(error)
        }
    }
}