import {colors} from './colors';

export function handleMongoError(error: any): Error {
    console.log(`${colors.red} MongoDB Error name:${error.name}, message:${error.message} `);

    if (error.name === 'MongoServerSelectionError' || error.name === 'MongoNetworkError') {
        return new Error('NOT_FOUND');
    }
    if (error.name === 'MongoTimeoutError') return new Error('DATABASE_TIMEOUT');
    if (error.name === 'ValidationError') return new Error('VALIDATION_ERROR'); // если правила валидации из схемы не выполняются
    if (error.name === 'CastError') return new Error('INVALID_ID_FORMAT'); // выброс если ищем не по ObjectId

    if ( error.code === 11000) { // 11000 код если UserModel.create 2 раза с идент данными создаем
        return new Error(`Duplicate some data`);
    }

    return error
}