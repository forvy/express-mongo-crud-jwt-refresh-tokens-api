# Express + MongoDB API CRUD - JWT Authentication with Refresh Tokens

To start on localhost do `npm install`.

And run using `npm start` or `npm run start:dev` localhost.

You can view the Swagger API documentation at http://localhost:4000/api-docs.

# Run localhost or Docker
Make sure to change config.json connectionString depending on the environment.
To run on Docker `docker-compose up -d --build`

# Default credential
By default, there are 2 users: 
- 1 as admin (example login as admin -> user: admin, pass: admin) and
- 1 as a normal user (example login as user -> user: user, pass: user).

For testing, you can use those default users or create a new user (default role: user).

# Before running in production
Make sure that you update the secret property in the config.json file.
