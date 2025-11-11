import {IUser, UserModel} from '../users/users.model';
import {handleMongoError} from '../../utils/handleError/mongoDBErrorHandle';
import {CreateUserInput} from 'moduls/users/user.types';
import {RegisterUserRes} from 'moduls/auth/auth.types';

export class AuthRepository {
    async create(data: CreateUserInput) {
        try {
            const newUser = await UserModel.create(data)

            const newUserResponse: RegisterUserRes = {
                login: newUser.login,
                email: newUser.email,
            }
            return newUserResponse

        } catch (err) {
            throw handleMongoError(err)
        }
    }
}