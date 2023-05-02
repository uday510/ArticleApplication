# ArticleApplication
NodeJS Article Application

## Features
* Client can signup 
* Client can signin
* Client can update password
* Client can update details (name , age only)
* Client can create article/s
* Client can read the article/s

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
- nodemon

## Installation

this app requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd articleApplication
npm install
npm start
```

# Rest endpoints

## Authentication endpoints
```
 - signup [POST] https://article-application.vercel.app/api/signup
 - login [POST] https://article-application.vercel.app/api/login
 
```

## Article endpoints
```
 - article create [POST] https://article-application.vercel.app/api/users/:userId/articles
 - url read all [GET]  https://article-application.vercel.app/api/articles
```

## User endpoints

```
 - user read details [GET]  https://article-application.vercel.app/api/users/
 - user update password [PATCH] https://article-application.vercel.app/api/users/
 - user update details [PATCH] https://article-application.vercel.app/api/users/:userId
 - user delete details [DELETE] https://article-application.vercel.app/api/users/:userId
```

# Sample Request Response objects

## Signup
```
NOTE : Token should be provided in headers for all endpoints except signup and signin

Eg: 
x-access-token: yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjgxOTY4ODIzLCJleHAiOjE2ODE5Njk0MjN9.VxFqS-    BiYtWtsv5gZdYdX2Tds7koiPFhkx3VT6TpszM 

POST https://article-application.vercel.app/api/signup

NOTE: Password should be min 8 length, with at least a symbol, upper and lower case letters and a number 

Request :   
{
    "name": "uday10",
    "userId": "uday10",
    "age": 16,
    "email":"uday10@gmail.com",
    "password": "*******************"
}

Response: 
{
    "statusCode": 201,
    "data": {
        "name": "uday10",
        "userId": "uday10",
        "email": "uday10@gmail.com",
        "age": 16
    },
    "message": "User created successfully"
}

```
## signin

```
POST https://article-application.vercel.app/api/login

Request: 
{
    "email":"uday10@gmail.com",
    "password": "****************"
}

Response: 
{
    "statusCode": 200,
    "data": {
        "name": "uday10",
        "userId": "uday10",
        "email": "uday10@gmail.com",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVkYXkxMCIsImlhdCI6MTY4MzAxNTIxMCwiZXhwIjoxNjgzMDE1ODEwfQ.gMAn8APwEYzXiMlpLmA0U_utnL4cZl5QDsVMX0oX_Dc"
    },
    "message": "Token sent successfully"
}

```

## fetch user details 
```
GET https://article-application.vercel.app/api/users/
Response: {
    "statusCode": 200,
    "data": {
        "name": "uday10",
        "userId": "uday10",
        "email": "uday10@gmail.com",
        "articlesCreated": [],
        "createdAt": "2023-05-02T08:12:05.157Z",
        "updatedAt": "2023-05-02T08:12:05.157Z"
    },
    "message": "Fetched user details successfully"
}
```
## Update password
```
PATCH  https://article-application.vercel.app/api/users/
Request : 
{
    "oldPassword": "xxxxxxxxxxxxxx",
    "newPassword": "xxxxxxxxxxxxxx"
}

Response :
{
    "statusCode": 200,
    "message": "Password successfully updated"
}

```
## update details
```
PATCH https://article-application.vercel.app/api/users/uday10
Request :  // name or age or both
{
    "age" : 18
}

Response : 
{
    "statusCode": 200,
    "data": {
        "name": "uday10",
        "email": "uday10@gmail.com",
        "userId": "uday10",
        "age": 18
    },
    "message": "User record successfully updated"
}

```

## delete user
```
DELETE https://article-application.vercel.app/api/users/uday10
Request :
 {
 no need to send any data
 }

Response : 
{
    statusCode: 200,
    "message": "Successfully deleted User"
}

```
## To create article

```
POST https://article-application.vercel.app/api/users/uday10/articles 
Request :
{
    "title": "Sample title",
    "description": "Sample description"
}
Response :
{
    "statusCode": 201,
    "data": {
        "userId": "6450c5d5e891486c086054ef",
        "title": "Sample title",
        "description": "Sample description",
        "_id": "6450c878e891486c086054fa",
        "createdAt": "2023-05-02T08:23:20.008Z",
        "updatedAt": "2023-05-02T08:23:20.008Z",
        "__v": 0
    },
    "message": "Article created Successfully"
}

```

## To read the all the articles
```
https://article-application.vercel.app/api/articles

Request : {
  // no need to pass any data
}
Response : {
    "statusCode": 200,
    "data": [
        {
            "_id": "6450c878e891486c086054fa",
            "userId": "6450c5d5e891486c086054ef",
            "title": "Sample title",
            "description": "Sample description",
            "createdAt": "2023-05-02T08:23:20.008Z",
            "updatedAt": "2023-05-02T08:23:20.008Z",
            "__v": 0
        }
    ],
    "message": "Fetched Articles successfully"
}
```
