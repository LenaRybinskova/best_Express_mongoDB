import {UserModel} from './users.model';
import {handleMongoError} from '../../utils/mongoDBErrorHandle';
import {UpdateUser} from 'models/users/user.types';

export class UserRepository {
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

    async update(id: string, payload: UpdateUser) {
        const updatedUser = await UserModel.findByIdAndUpdate(id, payload,
            {
                new: true, // в ответе будет юзер с обновл данными
                runValidators: true // еще раз валидацию по схеме прогонит
            }
        ).select('-password');

        return updatedUser;
    }

    async delete(id: string) {
        return await UserModel.findByIdAndDelete(id);
    }
}