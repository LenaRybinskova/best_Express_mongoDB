import {z} from 'zod';

// create schema ZOD
export const CreateCourseSchema = z.object({
    title: z.string()
        .min(3, 'Название должно быть 3 символа')
        .max(30, 'Название не может превышать 30 символов')
        .trim(),

    description: z.string()
        .min(10, 'Описание должно быть 10 символов')
        .max(1000, 'Описание не может превышать 1000 символов')
        .trim(),

    startedAt: z.string()
        .datetime('Неверный формат даты')
        .refine(date => new Date(date) > new Date(), {
            message: 'Дата начала должна быть в будущем'
        }),

    endedAt: z.string()
        .datetime('Неверный формат даты'),

    price: z.number()
        .min(1, 'Цена обязательое поле')

})
    // в data придет весь объект
    .refine(data => new Date(data.endedAt) > new Date(data.startedAt), {
        message: 'Дата окончания должна быть после даты начала',
        path: ['endedAt'] // какой филд с ошибкой
    })
    .strict();

export type CreateCourseInput = z.infer<typeof CreateCourseSchema>;

// update schema ZOD
export const UpdateCourseSchema = CreateCourseSchema.partial().strict();
export type UpdateCourseInput = z.infer<typeof UpdateCourseSchema>;