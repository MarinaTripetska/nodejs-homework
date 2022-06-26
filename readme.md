### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

Register user:
POST: 'host'/users/signup

Login user:
POST: 'host'/users/login

Logout user:
POST: 'host'/users/logout

Check current (login) user:
GET: 'host'/users/current

Update user's subscription:
PATCH: 'host'/users/

Working with contacts:
/api/v1/contacts
