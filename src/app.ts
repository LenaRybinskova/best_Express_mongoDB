import express from 'express';
import {usersRouter} from './models/users/users.router';
import {coursesRouter} from './models/courses/courses.router';
import {authRouter} from './models/auth/auth.router';
import {globalErrorHandler} from '../src/utils/handleError/globalErrorMiddleware';

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/users', usersRouter);
app.use('/courses', coursesRouter)
app.use('/auth', authRouter)

app.get('/', () => {
    console.log('Home')
})

app.use(globalErrorHandler)
export default app;


