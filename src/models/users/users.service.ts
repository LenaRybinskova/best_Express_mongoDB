import {UserRepository} from './users.repository';
import {UpdateCourseInput} from '../users/user.types';


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

    async update(authUserId: string, id: string, payload: UpdateCourseInput) {

        const updatedUser = await this.userRepository.update(authUserId, id, payload)

        if (!updatedUser || null) {
            throw new Error('NOT_FOUND');
        }

        return updatedUser
    }

    async delete(authUserId: string, id: string) {
        const deletedUser = await this.userRepository.delete(authUserId, id)
        if (!deletedUser) {
            throw new Error('NOT_FOUND');
        }

        return deletedUser
    }
}