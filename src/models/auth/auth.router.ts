import {Router} from 'express';
import {AuthController} from './auth.controller';
import {AuthRepository} from './auth.repository';
import {AuthService} from './auth.service';


export const authRouter = Router()
const authRepository = new AuthRepository()
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

authRouter
    .post('/', authController.register)
/*.post('/login', authController.login)
.post('/logout', authController.logout)
.get('/me', authController.me)*/

