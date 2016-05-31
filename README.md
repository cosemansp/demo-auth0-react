# demo-auth0-react

## API

### verifyUser

https://pecoimmo.herokuapp.com/api/auth/verifyUser
{
    "token": "myDomain",
    "user": "peter.cosemans@gmail.com",
    "password":"12345"
}

Response
{
  "status": "ok"
}

ErrorResponse - StatusCode: 401
{
  "code": 401,
  "error": "unauthorized",
  "status": "nok",
  "details": "invalid password"
}

---------------

### isUserregistered

https://pecoimmo.herokuapp.com/api/auth/isUserregistered
{
    "email": "peter.cosemans@gmail.com"
}

Response
{
  "status": "ok"
}

Error Response: 409
{
  "code": 409,
  "error": "conflict",
  "status": "nok",
  "details": "only gmail is supported"
}

---------------

