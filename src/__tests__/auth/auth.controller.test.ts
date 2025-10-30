import {CreateUserZodSchema} from '../../models/users/user.types';
import {zodValidateBodyMiddleware} from '../../utils/zodValidation/zodValidateBodyMiddleware';
import {Request, Response, NextFunction} from 'express';

/*jest.mock('../../utils/zodValidation/zodErrorHandle');*/
/*jest.mock('../../utils/responseHandle');*/

import {ResponseHandle} from "../../utils/handleError/responseHandle"
import { handleZodError } from '../../utils/zodValidation/zodErrorHandle';


describe('AuthController /auth/register', () => {
    // подменная функ
    const mockHandleZodError = handleZodError as jest.MockedFunction<typeof handleZodError>;
    const mockResponseHandle = ResponseHandle as jest.Mocked<typeof ResponseHandle>;

    describe('Валидация ZOD схемы CreateUserZodSchema', () => {
        it('Валидация ZOD прошла успешно', async () => {

            const mockRegisterData = {
                login: 'Lena333',
                password: 'password123',
                email: 'Lena333@fff.com',
            };

            const result = CreateUserZodSchema.safeParse(mockRegisterData);
            expect(result.success).toBe(true)
        })
        it('Валидация ZOD прошла не успешно, email не корректный', async () => {

            const mockRegisterData = {
                login: 'Lena333',
                password: 'pass',
                email: 'Lena333-com',
            };

            const result = CreateUserZodSchema.safeParse(mockRegisterData);
            expect(result.success).toBe(false)
        })
        it('Валидация ZOD прошла не успешно, передано лишнее поле', async () => {

            const mockRegisterData = {
                login: 'Lena333',
                password: 'pass',
                email: 'Lena333@fff.com',
                avatar: 'photo' //лишнее
            };

            const result = CreateUserZodSchema.safeParse(mockRegisterData);
            expect(result.success).toBe(false)
        })
    })

    describe('Валидация ZOD middleware', () => {
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        let mockNext: jest.Mock;

        afterEach(() => {
            jest.clearAllMocks();
        });

        beforeEach(() => {
            mockRequest = {
                body: {}
            };

            mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            mockNext = jest.fn();
        });

        it('Валидация ZOD успешная, должен обновиться req.body и вызвать next() без ошибки и аргументов', async () => {
            //data
            const inputData = {
                login: '  Lena333  ',
                password: 'password123',
                email: 'LENA333@FFF.COM',
            };

            mockRequest.body = {...inputData}

            //test
            zodValidateBodyMiddleware(CreateUserZodSchema)(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            //result
            const validationResult = CreateUserZodSchema.safeParse(mockRequest.body); // проверка, что схема данные валидирует
            expect(validationResult.success).toBe(true);
            expect(mockRequest.body).toBeDefined(); // проверка, что в боди в запросе мы что то передаем дальше, а не undefined
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenCalledWith(); // next вызван без аргументов
            expect(mockNext).not.toHaveBeenCalledWith(expect.any(Error)); // next вызван без ошибки
/*            expect(handleZodError).not.toHaveBeenCalled();*/
            expect(mockResponse.status).not.toHaveBeenCalled(); // методы респонс не вызывались
            expect(mockResponse.json).not.toHaveBeenCalled();

        })
        it('Валидация ZOD НЕ успешная,  формируется респонс с тестом ошибки,next() не вызывается', async () => {
            //data
            const inputData = {
                login: '  Lena333  ',
                password: 'password123',
                email: 'LENA333', // некорректные данные

            };

            mockRequest.body = {...inputData}

            //test
            zodValidateBodyMiddleware(CreateUserZodSchema)(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            //result
            const validationResult = CreateUserZodSchema.safeParse(mockRequest.body); // проверка, что схема данные валидирует
            expect(validationResult.success).toBe(false);
            expect(mockResponse.status).toHaveBeenCalledWith(400); // в рес стутс передали 400
            expect(mockResponse.json).toHaveBeenCalled();
            expect(mockRequest.body).toEqual(inputData) // проверка, что req.body не обновлялся
            expect(mockNext).not.toHaveBeenCalled(); // next() не вызывается
        })
    })
})