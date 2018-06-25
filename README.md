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
```perl
{
    "expires":"2018-06-25T12:15:22.585Z",  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE1Mjk4NDI1MjIsImV4cCI6MTUyOTkyODkyMn0.17fT6N0WB9WvG73afngaRF2-m_ZVxOuFH3Vj4NjvJZY"
}
```

# Study Data
There is lots of data that can be collected for the KoalaHero Study, from the interactions the user has with the app, to list of apps installed on a device during each session. Principally, collected data is segmented into 3 categories: Interaction, PhoneInfo, and Recordings.

## Interactions
Interaction logs are to be used as a means of gaining insights into how Koala Hero is being used.

Interactions with a device are oriented around the user's `study_id`, the `interaction_type`, and the `interaction_datetime`.

The format of a record is as follows:
```json
{
    "ID" : "Interaction Log ID Serial",
    "Study ID" : "The study id associated with this interaction",
    "Interaction Type" : "The type of interaction that this is, from button press, to map click",
    "Interaction Datetime" : "The time and Date at which the interaction log was recorded.",
    "Associated App ID" : "The packagename of the app that this interaction log is associated with, an empty string if it's not associated",
    "Page Name" : "The name of the page associated with this interaction log. e.g. 'map_view', or 'detail_host_view'",
    "Data" : "Additional Data associated with this interaction log. e.g. co-ordinates of map press"
}

```

## Phone Info
Phone information includes things like the list of installed apps, as well as the list of top ten most used apps. This data is used to show how the user may have changed their mobile usage between instances of using Koala Hero.

Phone info data is oriented around `study_id` and `info_datetime`.

The format of a record is as follows:
```json
{
    "ID" : "Phone Info ID Serial value",
    "study_id" : "The study id associated with this set of phone information",
    "Info Datetime" : "The date and time that this information was retrieved.",
    "Installed Apps" : "An array of installed app package IDs",
    "Top 10 Apps" : "An ordered list of the top ten installed app package name"
}
```

## Recordings
Audio recordings are used to gain insight into the decision making processes of participants of the study.

Recordings are oriented around `study_id` and `recording_datetime`.

The format of a record is as follows:
```json
{
    "ID" : "The id of this recording",
    "Study ID" : "The study id of the participant associated with this recording.",
    "Recording Datetime" : "The date and time the recording was started",
    "Recording Length" : "The length of the recording in seconds",
    "Recording File Path" : "The file path of the file on the server",
}
```