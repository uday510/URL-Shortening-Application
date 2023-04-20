# URL-Shortening-Application
This is NodeJS Based Application to shortening the URL

## Features
* Client can signup 
* Client can signin
* Client can update password
* Client can update details
* Client can delete details
* Client can create short urls
* Client can read the created urls
* Client can update the url
* Client can delete the url

## How is the code organized in this repo ?
The whole codebase is present in the single branch [main]

## Prerequisite
- Understanding of Node.js
- Understanding of Async Await

## Tech
- Node.js

## NPM Packages
- bcryptjs
- body-parser
- jsonwebtoken
- mongoose
- shortid
## Installation

this app requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd URL-Shortening-Application
npm install
npm start:dev
```

# Rest endpoints

## Authentication endpoints
```
 - signup [POST] 127.0.0.1:4000/app/api/v1/auth/signup
 - signin [POST] 127.0.0.1:4000/app/api/v1/auth/signin
 
```

## Url endpoints
```
 - url create [POST] 127.0.0.1:4000/app/api/v1//urls/
 - url read all [GET]  127.0.0.1:4000/app/api/v1//urls/
 - url read one [GET]  127.0.0.1:4000/app/api/v1//urls/:urlId
 - url update [PATCH] 127.0.0.1:4000/app/api/v1//urls/:urlId
 - url delete [DELETE] 127.0.0.1:4000/app/api/v1//urls/:urlId
```

## User endpoints

```
 - user read details [GET]  127.0.0.1:4000/app/api/v1/users/
 - user update password [PATCH] 127.0.0.1:4000/app/api/v1/users/
 - user update details [PATCH] 127.0.0.1:4000/app/api/v1/users/:userId
 - user delete details [DELETE] 127.0.0.1:4000/app/api/v1/users/:userId
```

# Sample Request Response objects

## Signup
```
Request :   
{
    "name":"admin",
    "userId": "admin",
    "email": "admin@gmail.com",
    "password": "xxxxxxxxxx"
}

Response: 
{
    "message": "User created successfully",
    "data": {
        "name": "admin",
        "userId": "admin",
        "email": "admin@gmail.com"
    }
}

## signin
```
