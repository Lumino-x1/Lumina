# Video Call Architecture

Lumina's Video Call module provides production-ready one-to-one and group real-time video calling powered by Stream
Video SDK infrastructure.

---

## 1. System Architecture Diagram

```text
User A (Frontend)             Backend API (Node/Bun)             Stream Video Platform
   │                                  │                                    │
   ├────── 1. Authenticate ──────────►│                                    │
   │                                  ├────── 2. HMAC Sign Token ─────────►│
   │◄───── 3. Return Token & Key ─────┤                                    │
   │                                  │                                    │
   ├────── 4. Create/Join Call ──────►│                                    │
   │                                  ├────── 5. Verify Authorization ─────┤
   │                                  ├────── 6. Save VideoCall Record ────┤
   │◄───── 7. Return Stream Call ID ──┤                                    │
   │                                                                       │
   └───────────── 8. WebRTC Audio/Video Stream ───────────────────────────►│
```

---

## 2. Security & Authorization Model

1. **Identity Mapping**: Lumina `user.id` maps 1:1 to Stream Video `user_id`.
2. **Server-Side Token Generation**: Tokens are generated server-side using HMAC-SHA256 signing with
   `STREAM_API_SECRET`. `STREAM_API_SECRET` is NEVER exposed to the frontend browser context.
3. **Call Access Verification**: Private 1-on-1 calls verify participant identity; group calls verify membership or
   invitation before authorizing access.
