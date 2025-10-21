import {UserRepository} from './users.repository';
import {UpdateUser} from '../users/user.types';


export class UsersService {

    constructor(private userRepository: UserRepository) {
    }

    async getAllUsers() {
        return await this.userRepository.getAllUsers();
    }

    async getById(id: string) {
        const user = await this.userRepository.getById(id)

        if (!user || null) {
            throw new Error('NOT_FOUND');
        }

        return user;
    }

    async update(id: string, payload: UpdateUser) {

        const updatedUser = await this.userRepository.update(id, payload)

        if (!updatedUser || null) {
            throw new Error('NOT_FOUND');
        }

        return updatedUser
    }

    async delete(id: string) {
        const deletedUser = await  this.userRepository.delete(id)

        if (!deletedUser) {
            throw new Error('NOT_FOUND');
        }
    }
}