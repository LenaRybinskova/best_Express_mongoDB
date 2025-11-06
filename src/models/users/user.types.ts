import {z} from 'zod';
import {IUser} from '../../models/users/users.model';

// Request types
// create user schema ZOD
export const CreateUserZodSchema = z.object({
    login: z.string()
        .min(6, 'login должен быть не менее 6 символов')
        .max(15, 'login не может превышать 15 символов')
        .trim(),

    password: z.string()
        .min(6, 'Пароль не должен быть меньше 6 символов')
        .max(20, 'Пароль не может превышать 20 символов')
        .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
        .regex(/^\S*$/, 'Пароль не должен содержать пробелов')
        .trim(),

    email: z.string()
        .email('Неверный формат email адреса')
        .min(5, 'Email слишком короткий')
        .max(100, 'Email слишком длинный')
        .toLowerCase()
        .transform(val => val.toLowerCase().trim()),
}).strict()
export type CreateUserInput = z.infer<typeof CreateUserZodSchema>;


// update user schema ZOD
export const UpdateCourseSchema = CreateUserZodSchema.partial().strict();
export type UpdateCourseInput = z.infer<typeof UpdateCourseSchema>;


// userID schema ZOD
export const IdParamSchema = z.string().regex(/^[0-9a-fA-F]{24}$/)
export type IdParam = z.infer<typeof IdParamSchema>;


// Response types
export type UserWithoutPassword = Omit<IUser, 'password'>;
