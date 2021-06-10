# Messenger

A one-to-one realtime chat app.
Tech stack used:
React, node, expressJs, csurf, redux, react-router, socket.io, axios, eslint, cookie-parser, jsonwebtoken, sequelize...

## Running Application Locally


=> Create a database with psql:

```
  psql
  CREATE  DATABASE <nameOfDatabase>;
  \q
```

=> Install dependencies for server and for client:

```
  cd client
  npm install
  cd..
  cd server
  npm install
```

=>Create a .env file in the server directory and add your session secret and database url...

```
SESSION_SECRET = "your session secret"
DATABASE_URL = "postgres://localhost:5432/{DatabaseName}"
```

=> Seed the database, you may need to change "db/models/db.js" - Line 03 "process.env.DATABASE_URL" with database url temporariy, and should revert this change after seeding

```
npm run seed
```

=> Start server
```
npm run dev
```

=> Start client
```
npm start
```

To begin open the browser and go to http://localhost:3000/ 
