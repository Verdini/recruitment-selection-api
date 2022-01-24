# Recruitment & Selection backend service

A simple API for a Recruitment & Selection platform.

### Basic steps to build the backend:
- Project design (routes and models)
- Setup application with the nest-cli
- Create routes with basic response
- Create the entities
- Add database connection
- Add database communication with typeorm
- Add Documentation (Swagger)
- Run unit tests
- Review security issues

### Nest installation and command helpers:
npm i -g @nestjs/cli
npx nest new backend
npx nest generate module [name]
npx nest g resource [name]

### Additional packages installed:
npm i @nestjs/typeorm typeorm pg
npm i bcrypt
npm i --save-dev @types/bcrypt
npm i git+https://github.com/gupy-io/gupy-env.git
npm i @nestjs/passport passport passport-http-bearer passport-jwt
npm i @nestjs/swagger swagger-ui-express
npm i @nestjs/cqrs

### Environment variables

Use a file like .env.yml with the following variables:

DB_HOST: 'hostname'
DB_PORT: '5432'
DB_NAME: 'dbname'
DB_USERNAME: 'username'
DB_PASSWORD: 'password'

