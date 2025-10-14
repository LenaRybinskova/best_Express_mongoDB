import {AuthRepository} from './auth.repository';

export class AuthService {
    constructor(private authRepository: AuthRepository) {}

   async register(){
        console.log("AuthService register" )
        return await this.authRepository.create()
    }
}