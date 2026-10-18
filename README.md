# Khulumani FM 95.0 Web Radio

A high-performance, resilient web radio player and digital portal for **Khulumani FM 95.0**, the youth community radio station broadcasting from Montrose Studios in Bulawayo, Zimbabwe (Zimbabwe Broadcasting Corporation).

## Why This Exists (Fixing The 5-Minute Stream Stall)

The legacy station website suffered from frequent audio dropouts, stopping playback every ~5 minutes due to:

1. Cloudflare edge proxy timeouts cutting long-lived HTTP audio streaming connections.
2. Default HTML5 `<audio>` players entering unhandled `stalled` or `waiting` states without auto-recovery.
3. Lack of cache-busting on re-requests, resulting in stale chunk replay loops.

This application fixes those problems through:

- **Active Stream Watchdog**: A background timer monitors playback continuity every 3 seconds. If `currentTime` fails to advance for more than 4.5 seconds during an active stream, the engine automatically purges the dead socket and restarts with fresh timestamps.
- **Cache-Busted Direct Stream Reconnection**: Direct connection to `https://khulumanistream.zbc.co.zw:8000/radio.mp3` with timestamp parameters (`_kfm=${timestamp}`) that bypass CDN timeouts and proxy caching.
- **Exponential Backoff & Jitter**: Prevents server swarming if mobile connections temporarily lose cellular signal.
- **Native MediaSession API**: Ensures continuous background playback on iOS Safari, Android Chrome, and macOS/Windows lockscreens with title, presenter, and media controls.

---

## Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Styling**: Tailwind CSS with custom design tokens for Bulawayo's visual identity (rich obsidian `#0d0f12`, warm gold `#f59e0b`, and acacia teal `#0d9488`).
- **Icons**: Lucide React
- **Testing**: Vitest with unit tests for audio watchdog logic and schedule calculation.
- **Deployment**: Vercel with automatic domain aliasing to `khulumani.hakili.online`.

---

## Prerequisites

- Node.js 20+ (tested on Node 22.x)
- npm or pnpm

---

## Environment Variables

| Variable                 | Description                                            | Example / Default                                  |
| :----------------------- | :----------------------------------------------------- | :------------------------------------------------- |
| `NEXT_PUBLIC_STREAM_URL` | Direct Icecast / MP3 audio stream URL for Khulumani FM | `https://khulumanistream.zbc.co.zw:8000/radio.mp3` |

See `.env.example` for details.

---

## Local Setup

1. Clone or navigate to the directory:

   ```bash
   cd khulumani-fm
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## Verification & Testing

Run all unit tests:

```bash
npm run test
```

Run TypeScript strict checks:

```bash
npm run typecheck
```

Run code linter:

```bash
npm run lint
```

Format check:

```bash
npm run format:check
```

---

## Deployment to Vercel

To deploy to Vercel and map the custom domain:

```bash
vercel --prod
vercel alias <deployment-url> khulumani.hakili.online
```
