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
- availableСourses
- authorCourses
- comments

# Course:

- id
- authorId(userId)
- title
- description
- startedAt
- endedAt
- price
- lessons
- reviews
- rating
- studentsId (кто прошел курс)

# Lesson:

- id
- authorId(userId)
- courseId
- title
- description
- startedAt
- comments
- resourcesId
- studentsId (кто прошел ушел)

# Resource:

- id
- lessonId
- file
- video
- link

# TextComment:

- id
- authorId(userId)
- lessonId
- dataPublish
- message

# RatingCourse:

- id
- authorId(userId)
- courseId
- raiting(1 - 5)
