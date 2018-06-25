# xray-koala-hero-server

This is a TypeScript implented server for the XRay Koala Hero Android application.



# Endoints

## `/koala`


## `/auth`

`/auth`

is used to authenticate a client. It expects a body containing an email and password, returning an JWT if successfully authenticated.



`/auth/registration`

Is used to register new users, authenticating the client if registration is successful.



Example Curl Request:
```
curl -X POST -H "Content-type: application/json" -d '{"email":"example@example.com", "password":"P4$$w0rd"}' "localhost:8084/auth/registration"

```
Example Body Data
```json
{
    "email":"example@example.com",
    "password": "P4$$w0rd"
}
```

Example Resonse Data
```json
{
    "expires":"2018-06-25T12:15:22.585Z",  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE1Mjk4NDI1MjIsImV4cCI6MTUyOTkyODkyMn0.17fT6N0WB9WvG73afngaRF2-m_ZVxOuFH3Vj4NjvJZY"
}
```

