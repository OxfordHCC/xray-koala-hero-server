# xray-koala-hero-server

This is a TypeScript implented server for the XRay Koala Hero Android application.


# Endoints

## `/koala`


## `/auth`

`/auth` is used to authenticate a client. It expects a body containing an email and password, returning an JWT if successfully authenticated.

```json
{
    'email':'example@example.com',
    'password': 'P4$$w0rd'
}
```

`/auth/registration` Is used to register new users, authenticating the client if registration is successful.
