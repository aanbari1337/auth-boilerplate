# Authentication boilerplate
 
 ## Prerequisite
* Node >= 16.
* Redis.
* Postgresql.
 
 ## Installation
<p>This is a Node.js boilerplate authentication using prisma available through the npm registry.</p>

```
npx my-authentication-boilerplate *project-name*
```
## Quick Start
<p>Create a .env file and put your environment variables.</p>

```
DATABASE_URL='postgresql://<USERNAME:<PASSWORD>@localhost:5432/<DATABASE_NAME>'
PORT=3000
REDIS_URL=127.0.0.1:6379
SESSION_SECRET='jvhjvhgvijfcfc'
CORS_ORIGIN=http://localhost:3000
```
<p>Make sure Postgresql and Redis server is running on your computer.Then run:</p>

```
$ npm run dev
```
