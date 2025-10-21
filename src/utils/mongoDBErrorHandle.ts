
export function handleMongoError(error: any): Error {
    console.log('MongoDB Error name:', error.name);
    console.log('MongoDB Error message:', error.message);

    if (error.name === 'MongoServerSelectionError' || error.name === 'MongoNetworkError') {
        return new Error('NOT_FOUND');
    }
    if (error.name === 'MongoTimeoutError') return new Error('DATABASE_TIMEOUT');
    if (error.name === 'ValidationError') return new Error('VALIDATION_ERROR'); // если правила валидации из схемы не выполняются
    if (error.name === 'CastError') return new Error('INVALID_ID_FORMAT'); // выброс если ищем не по ObjectId

    if (error.name === 'MongoServerError' && error.code === 11000) { // 11000 код если UserModel.create 2 раза с идент данными создаем
        const field = error.message.match(/index: (.+?)_/)?.[1] || 'ENTRY';
        return new Error(`DUPLICATE_${field.toUpperCase()}`);
    }

    return error
}