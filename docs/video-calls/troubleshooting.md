# Video Call Troubleshooting Guide

Troubleshooting guide for common Stream Video integration issues and resolution steps.

---

## Common Issues & Recovery

### 1. `CALL_UNAUTHORIZED` (HTTP 403)

- **Symptom**: User receives `403 Forbidden` when attempting to join a video call.
- **Cause**: User is not listed as an invited participant or host for the private call.
- **Resolution**: Verify that the host invited the user's `userId` when creating the call (`POST /api/video/calls`).

### 2. Missing Stream Credentials

- **Symptom**: `STREAM_API_KEY is missing` error log.
- **Resolution**: Ensure `STREAM_API_KEY` and `STREAM_API_SECRET` are configured in `.env` or system environment
  variables.
