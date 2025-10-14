### Проект: Образовательная платформа

Стек: Experss.js, MongoDB (Mongoose)

Проект представляет собой платформу с образовательными курсами.
Пользователи могут создавать свои курсы (быть авторами), проходить курсы других пользотвателей (быть пользователями), так же есть роль Администратора платформы.
Курсы содержит описание и набор уроков.
Перечень курсов и наборы уроков в них являются публичными, доступны всем пользователям.
У пользователей платформы есть возможность возможно комментировать уроки, видеть комментарии других пользователей, выставлять рейтинг курсов.
К каждому уроку можно добавить фото, видео, описание, документы, ссылки.

## Модели данных.

# User:

- id
- firstName
- lastName
- login
- password
- email
- avatar
- experience
- role
- availableCourses (References)
- authorCourses (References)
- comments (References)

# Course:

- id
- authorId(userId) (References)
- title
- description
- startedAt
- endedAt
- price
- lessonsId (References)
- commentsId (References)
- ratingStat (Embedded) [{id, rating}, {}, {}]
- ratingResult ()
- ratingCount
- studentsId (кто прошел курс) (References)

# Lesson:

- id
- authorId(userId) (References)
- courseId (References)
- title
- description
- startedAt
- commentsId (References) 
- resources (Embedded) {files,video, resourceLink }
- studentsId (кто прошел уже) (References)


# Comments:

- id
- authorId(userId)  (References)
- courseId (References)
- dataPublish
- text
