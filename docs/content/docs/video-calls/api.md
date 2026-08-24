# Video Call API Specification

Specification of all `/api/v1/video/*` endpoints.

---

## 1. Endpoints Overview

| Method | Endpoint                              | Description                                   | Auth Required |  Rate Limit  |
| :----- | :------------------------------------ | :-------------------------------------------- | :-----------: | :----------: |
| `POST` | `/api/v1/video/token`                 | Generates a Stream Video user JWT token       |      Yes      | 30 req / 15m |
| `POST` | `/api/v1/video/calls`                 | Creates a new 1-on-1 or group video call      |      Yes      | 20 req / 15m |
| `GET`  | `/api/v1/video/calls/history`         | Fetches call history log for the user         |      Yes      |     None     |
| `GET`  | `/api/v1/video/calls/:callId`         | Retrieves call details and participant status |      Yes      |     None     |
| `POST` | `/api/v1/video/calls/:callId/join`    | Authorizes access and returns Stream call ID  |      Yes      |     None     |
| `POST` | `/api/v1/video/calls/:callId/respond` | Accepts or declines call invitation           |      Yes      |     None     |
| `POST` | `/api/v1/video/calls/:callId/end`     | Host ends active video call session           |      Yes      |     None     |
