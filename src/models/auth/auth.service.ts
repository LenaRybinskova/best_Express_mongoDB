import {AuthRepository} from './auth.repository';
import {CreateUserInput} from '../users/user.types';
import {IUser} from 'models/users/users.model';

export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    async register(data: IUser) {
            return await this.authRepository.create(data)
    }
}