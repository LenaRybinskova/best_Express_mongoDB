import request from 'supertest';
import { StatusCodes } from 'http-status-codes'
import app from 'app';

describe('AuthController /auth/register', () => {
    it('should register user and return user data', async () => {

        //data
        const payload = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'test@email.com',
            password: '123',
        }

        // имит запрос
        const response = await request(app)
            .post('/auth')
            .send(payload)


        console.log('REAL RESPONSE:', response.body)
        // ожидаемый рез кода
        expect(response.statusCode).toBe(StatusCodes.CREATED)

        // ожидаемая структура ответа
        expect(response.body).toEqual({
            user: {
                id: 1,
                firstName: 'Lena',
                email: 'lena@email.com'
            }
        })
    })
})