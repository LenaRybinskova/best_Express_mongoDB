import {z} from 'zod';

// create schema ZOD
export const CreateLessonSchema = z.object({
    title: z.string()
        .max(100, 'Название не может превышать 100 символов')
        .trim(),

    description: z.string()
        .min(10, 'Описание должно быть не менее 10 символов')
        .max(500, 'Описание не может превышать 500 символов')
        .trim(),

    startedAt: z.string()
        .datetime('Неверный формат даты')
        .refine(date => new Date(date) > new Date(), {
            message: 'Дата начала должна быть в будущем'
        }),

    resources: z.object({
        files: z.array(z.string()).default([]),
        video: z.object({
            url: z.string()
                .url('Некорректный URL видео')
                .default(''),
            duration: z.number()
                .int('Длительность должна быть целым числом')
                .min(0, 'Длительность не может быть отрицательной')
                .default(0),
            thumbnail: z.string()
                .url('Некорректный URL превью')
                .optional()
                .default('')
        }).default({
            url: '',
            duration: 0,
            thumbnail: ''
        }),
        resourceLink: z.array(z.string()).default([])
    }).default({
        files: [], video: {
            url: '',
            duration: 0,
            thumbnail: ''
        },
        resourceLink: []
    })
}).strict();


export type CreateLessonDTO = z.infer<typeof CreateLessonSchema>;

export type CreateLessonWithID = CreateLessonDTO & {
    courseId: string;
    authorId: string;
};

// update schema ZOD
export const UpdateLessonSchema = z.object({
    title: z.string()
        .max(100, 'Название не может превышать 100 символов')
        .trim()
        .optional(),

    description: z.string()
        .min(10, 'Описание должно быть не менее 10 символов')
        .max(500, 'Описание не может превышать 500 символов')
        .trim()
        .optional(),

    startedAt: z.string()
        .datetime('Неверный формат даты')
        .refine(date => new Date(date) > new Date(), {
            message: 'Дата начала должна быть в будущем'
        })
        .optional(),

    resources: z.object({
        video: z.object({
            url: z.string()
                .url('Некорректный URL видео')
                .optional(),
            duration: z.number()
                .int('Длительность должна быть целым числом')
                .min(0, 'Длительность не может быть отрицательной')
                .optional(),
            thumbnail: z.string()
                .url('Некорректный URL превью')
                .optional()
        }).optional()
    }).optional()
}).strict();

export type UpdateLessonDTO = z.infer<typeof UpdateLessonSchema>;

//добавление файлов в Ресурсы
export const AddFilesSchema = z.object({
    files: z.array(
        z.string()
            .refine(url => {
                // Дополнительная проверка на файловые расширения
                const allowedExtensions = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.zip'];
                return allowedExtensions.some(ext => url.toLowerCase().includes(ext));
            }, {
                message: 'Файл должен быть одного из разрешенных типов: PDF, DOC, PPT, ZIP'
            })
    )
        .min(1, 'Должен быть хотя бы один файл')
        .max(10, 'Не более 10 файлов за раз')
}).strict();

export type addFilesLessonDTO = z.infer<typeof AddFilesSchema>;


export const AddLinkSchema = z.object({
    resourceLink: z.array(
        z.string()
            .min(1, 'Должен быть хотя бы один файл')
            .max(10, 'Не более 10 файлов за раз'))
}).strict();

export type addLinksLessonDTO = z.infer<typeof AddLinkSchema>;

// удаление файлов из Ресурсов по названию
export const DeleteFileSchema = z.object({
    file: z.string()
        .url('Некорректный URL файла')
        .refine(url => {
            const allowedExtensions = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.zip', '.txt'];
            return allowedExtensions.some(ext => url.toLowerCase().includes(ext));
        }, {
            message: 'Файл должен быть одного из разрешенных типов: PDF, DOC, PPT, ZIP, TXT'
        })
}).strict();

export type deleteFileLessonDTO = z.infer<typeof DeleteFileSchema>;


export const DeleteLinkSchema = z.object({
    resourceLink:
        z.string()
}).strict();

export type deleteLinkLessonDTO = z.infer<typeof DeleteLinkSchema>;