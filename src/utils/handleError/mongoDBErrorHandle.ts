import {colors} from '../colors';

export function handleMongoError(error: any): Error {
    console.log(`${colors.red} handleMongoError: name:${error.name}, message:${error.message} `);

    if (error.name === 'MongoServerSelectionError' || error.name === 'MongoNetworkError') {
        return new Error('NOT_FOUND');
    }
    if (error.name === 'MongoTimeoutError') return new Error('DATABASE_TIMEOUT');

    if (error.name === 'ValidationError' || error.name === 'CastError') {
        return new Error('VALIDATION_ERROR');
    }

    if ( error.code === 11000) { // 11000 код если UserModel.create 2 раза с идент данными создаем
        return new Error(`Duplicate some data`);
    }

    return error
}