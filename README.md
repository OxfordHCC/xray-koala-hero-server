# xray-koala-hero-server

This is a TypeScript implented server for the XRay Koala Hero Android application.


# Endoints

## `/koala`
Endpoints used for the Koala study, require the client to be authenticated for use.

### `/koala/interaction`

Used to log an interaction record.

Example Curl Request:
```bash
curl -X POST -H "Content-type: application/json" -d '{"auth_details":{"study_id":"BigFatWhale", "token":"sOmE.T0k3n.G03z.H3r3"}, "interaction":{"study_id":"BigFatWhale", "interaction_type":"Test Interaction.","interaction_datetime":"2045-11-10T16:15:03.971Z", "associated_app_id":"com.facebook.orca", "page_name":"Not a Page", "additional_data":{"data":"none"}}}' localhost:8084/koala/interaction
```

Example Body Data:
```json
{
    "auth_details": {
        "study_id":"BigFatWhale",
        "token":"sOmE.T0k3n.G03z.H3r3"
    },
    "interaction": {
        "study_id":"BigFatWhale",
        "interaction_type":"Test Interaction.",
        "interaction_datetime":"2045-11-10T16:15:03.971Z",
        "associated_app_id":"com.facebook.orca",
        "page_name":"Not a Page",
        "additional_data":{
            "data":"none"
        }
    }
}
```

Example Responses:

Success:
```json
{
    "Success":"Interaction was successfully logged."
}
```

Failure:
```json
{
    "Error": {
        "name":"error",
        "length":88,
        "severity":"ERROR",
        "code":"42601",
        "position":"90",
        "file":"scan.l",
        "line":"1083",
        "routine":"scanner_yyerror"
    }
}
```


### `/koala/phone_info`
Used to log a PhoneInfo record.

Example Curl Request:
```bash
curl -X POST -H "Content-type: application/json" -d '{"auth_details":{"study_id":"BigFatWhale", "token":"sOmE.T0k3n.G03z.H3r3"}, "phone_info":{"study_id":"BigFatWhale", "retrieval_datetime":"2045-11-10T16:15:03.97", "installed_apps":["com.facebook.orca","something.something.com"], "top_ten_apps":["something.something.something", "something.com.something", "com.something.something"]}}' localhost:8084/koala/phone_info
```

Example Body Data:
```json
{
    "auth_details":{
        "study_id":"BigFatWhale",
        "token":"sOmE.T0k3n.G03z.H3r3"
    },
    "phone_info":{
        "study_id":"BigFatWhale",
        "retrieval_datetime":"2045-11-10T16:15:03.97",
        "installed_apps":
        [
            "something.something.something",
            "something.com.something",
            ...,
            "com.something.something"
        ],
        "top_ten_apps":
        [
            "something.something.something",
            "something.com.something",
            ...,
            "com.something.something"
        ]
    }
}
```

Example Responses:

Success:
```json
{
    "Success":"Interaction was successfully logged."
}
```

Failure:
```json
{
    "Error": {
        "name":"error",
        "length":88,
        "severity":"ERROR",
        "code":"42601",
        "position":"90",
        "file":"scan.l",
        "line":"1083",
        "routine":"scanner_yyerror"
    }
}
```

## `/auth`

### `/auth/`


is used to authenticate a client. It expects a body containing an email and password, returning an JWT if successfully authenticated.



### `/auth/registration`


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

