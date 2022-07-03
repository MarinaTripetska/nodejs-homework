### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

_For testing new user registration? you can use [TempMail](https://temp-mail.org/) for generate fake email address ;)_

## Registration and authentification user

### Register user:

**POST:** _'host'/users/signup_

### Confirm user's email:

**GET:** _'host'/users/verify/:verificationToken_

### Resend confirmation key to user's email:

**POST:** _'host'/users/verify_

### Login user:

**POST:** _'host'/users/login_

### Logout user:

**POST:** _'host'/users/logout_

### Check current (login) user:

**GET:** _'host'/users/current_

### Update user's subscription:

**PATCH:** _'host'/users/_

### Update user's avatar:

**PATCH:** _'host'/users/avatars_

Working with contacts:
/api/v1/contacts.....
