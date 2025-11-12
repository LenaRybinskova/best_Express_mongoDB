import {z} from 'zod';

// create schema ZOD
export const CreateLessonSchema = z.object({
   /* authorId: z.string()
        .min(1, "Author ID is required") // проверка на пустую строку
        .regex(/^[0-9a-fA-F]{24}$/) //c Клиента пришал просто строка, НО ее можно проверить соотв ли она типу Types.ObjectId
        .trim(),
*/
    title: z.string()
        .max(100, 'Описание не может превышать 100 символов').trim(),

    description: z.string()
        .min(10, 'Описание должно быть 10 символов')
        .max(500, 'Описание не может превышать 500 символов')
        .trim(),

    startedAt: z.string()
        .datetime('Неверный формат даты')
        .refine(date => new Date(date) > new Date(), {
            message: 'Дата начала должна быть в будущем'
        }),
    resources: z.object({
        files: z.array(z.string()).default([]),
        video: z.string().default(""),
        resourceLink: z.array(z.string()).default([])
    }).default({} as { files: string[]; video: string; resourceLink: string[] })

})
    .strict();

export type CreateLessonDTO = z.infer<typeof CreateLessonSchema>;

export type CreateLessonWithID = CreateLessonDTO & {
    courseId: string;
    authorId: string;
};

// update schema ZOD
/*export const UpdateLessonSchema = CreateLessonSchema.partial().omit({ authorId: true }).strict();*/
export const UpdateLessonSchema = CreateLessonSchema.partial().strict();
export type UpdateLessonDTO = z.infer<typeof UpdateLessonSchema>;