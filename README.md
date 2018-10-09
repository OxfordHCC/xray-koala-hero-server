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
curl -X POST -H "Content-type: application/json" -d '{"email":"example@example.com", "password":"P4$$w0rd","study_id":"BigFatWhale"}' "localhost:8084/auth/registration"

```
Example Body Data
```json
{
    "email":"example@example.com",
    "password": "P4$$w0rd",
    "study_id" : "BigFatWhale"
}
```

Example Resonse Data
```json
{
    "expires":"2018-06-25T12:15:22.585Z",  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE1Mjk4NDI1MjIsImV4cCI6MTUyOTkyODkyMn0.17fT6N0WB9WvG73afngaRF2-m_ZVxOuFH3Vj4NjvJZY"
}
```


## How to setup.

You will need node.js, and a TypeScript (tsc) compiler installed in order to build the project.

If you haven’t yet, go [install Node.js](https://nodejs.org/en/download/) which will also install the command-line package manager, npm.

To install TypeScript, typically you can run
```
npm install --global typescript
```

This will give you `tsc` on your command line.

Once you have the above set up on your server you are ready to start!

1. From a Linux environment, clone the repository.
2. initialise a PostgreSQL Database using `init_db.sql` found in `path_to_repo/db/init_db.sql` (Prerequsitie: a Postgres server and client running on your system)
3. make a copy of `example_config.json` and rename it to `config.json`
4. update the details of `config.json` so it accurately reflects your DB setup.
5. run `npm install` to install all node packages required for the project
6. run `tsc --build tsconfig.json` in the root directory of the project, which will build JavaScript code in the `build/` directory
7. use `node js` in the `path_to_repo` to run the `build/koala/server.js` file using the command of `node build/koala/server.js`
8. from a web browser, navigate to `localhost:8084` or `localhost:<<whatever port>>` if you changed the port number in `config.json`

