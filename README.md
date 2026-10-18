# Khulumani FM 95.0 Web Radio & Broadcast CRM

A high-performance, resilient web radio portal and Studio Content Management CRM for **Khulumani FM 95.0** (_"Izwi Lethu, Igugu Lethu"_), the youth community radio station broadcasting from Montrose Studios in Bulawayo, Zimbabwe (Zimbabwe Broadcasting Corporation).

## Why This Exists (Fixing The 5-Minute Stream Stall)

The legacy station website suffered from frequent audio dropouts, stopping playback every ~5 minutes due to:

1. Cloudflare edge proxy timeouts cutting long-lived HTTP audio streaming connections.
2. Default HTML5 `<audio>` players entering unhandled `stalled` or `waiting` states without auto-recovery.
3. Lack of cache-busting on re-requests, resulting in stale chunk replay loops.

This application fixes those problems through:

- **Active Stream Watchdog**: A background timer monitors playback continuity every 3 seconds. If `currentTime` fails to advance for more than 4.5 seconds during an active stream, the engine automatically purges the dead socket and restarts with fresh timestamps.
- **Cache-Busted Direct Stream Reconnection**: Direct connection to `https://khulumanistream.zbc.co.zw:8000/radio.mp3` with timestamp parameters (`_kfm=${timestamp}`) that bypass CDN timeouts and proxy caching.
- **Persistent Global Audio Context**: Navigating across `/`, `/news`, `/shows-schedule`, `/charts-elementor`, `/team-members`, `/contacts`, and `/crm` never interrupts live audio playback.

---

## Montrose Broadcast CRM (`/crm`) & Pre-Publish Preview Workflow

Studio administrators can sign in at `/crm` to manage all website content with a **Draft -> Preview -> Publish** workflow:

1. **Server-Side Authentication**:
   - Credentials are verified strictly on the server via `bcryptjs` against `CRM_ADMIN_PASSWORD_HASH`.
   - Sessions are issued as HMAC-SHA256 signed `HttpOnly; SameSite=Lax` cookies (`khulumani_crm_session`).
   - All state-changing routes validate inputs via `zod` schemas and verify the `Origin` header against `ALLOWED_ORIGINS`.
2. **Staged Draft Editing**:
   - Update the Homepage Hero & Broadcast Notice, Contacts & Studio Hotlines, Top 10 Weekly Charts, 7-Day Show Schedule, Personalities, and News Bulletins.
   - Saving a draft (`PUT /api/cms/content`) stores staged changes without altering what public listeners see on the main website.
3. **Interactive Pre-Publish Preview**:
   - Open the **Pre-Publish Website Preview Modal** inside `/crm` to compare **Staged Draft** vs. **Current Live** content and inspect which sections have pending changes.
   - Or launch **Full-Page Live Preview Mode**, which renders a sticky **Preview Mode Bar** across `/`, `/shows-schedule`, `/charts-elementor`, `/team-members`, `/news`, and `/contacts` so administrators can toggle between Draft and Live views in real time before clicking **Publish to Main Website**.

---

## Environment Variables

Every variable read by the application is documented in `.env.example`:

| Variable                  | Description                                                          | Where to get / generate                                                                          |
| :------------------------ | :------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_STREAM_URL`  | Public Live Radio Audio Stream URL for Khulumani FM 95.0             | `https://khulumanistream.zbc.co.zw:8000/radio.mp3`                                               |
| `CRM_ADMIN_EMAIL`         | Studio Admin login email for `/crm`                                  | Configured by station administrator                                                              |
| `CRM_ADMIN_PASSWORD_HASH` | Bcrypt hash of the Studio Admin password                             | Run `node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 10))" "<your-password>"` |
| `CRM_SESSION_SECRET`      | 32-byte random hex secret for signing `HttpOnly` CRM session cookies | Run `openssl rand -hex 32`                                                                       |
| `ALLOWED_ORIGINS`         | Comma-separated allowlist of origins for state-changing API requests | `https://khulumani.hakili.online,http://localhost:3000`                                          |

---

## Local Setup & Verification

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and set your local values.
3. Run quality checks and unit tests:
   ```bash
   npm run typecheck
   npm run lint
   npm run format:check
   npm test
   npm run build
   ```
