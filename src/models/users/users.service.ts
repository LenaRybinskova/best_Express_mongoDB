import {UserRepository} from './users.repository';


export class UsersService {

    constructor( private userRepository: UserRepository) {}

    async getAllUsers() {
        console.log('getAllUsers');
        return await this.userRepository.getAllUsers();
    }

}