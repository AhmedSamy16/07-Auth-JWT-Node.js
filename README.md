# 07-Auth-JWT-Node.js

This is project 7/50 of my Node.js projects series. It's a Full Auth system involving signup, login, and protected routes using JWT. The projet has all errors handled in global error handler middleware.

Requests to any /posts/ routes will fail if there's no valid token given in the request headers.

To get a valid token first you have to signup through /api/v1/signup/ using POST request providing all the data needed.

Or through Login to /api/v1/login/ providing valid email or password.

## Topics covered
Node.js, Express.js, mongoose, JWT, validator.js