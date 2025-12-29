# Jarvis Mentor Console

An offline-first, modular assistant engineered around Ubuntu workflows. Jarvis acts as a pragmatic mentor that keeps context, manages a lightweight execution plan, and exposes audit logs and rollback snapshots.

## Features

- Deterministic mentor responses with transparent module outputs
- Offline-ready PWA with local IndexedDB persistence
- Snapshot + rollback system for safe experimentation
- Audit log, module switches, and execution planner sidebar
- Built with Next.js 14, Tailwind CSS, and Zustand

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

### Production build

```bash
npm run build
npm start
```

### Tests and lint

```bash
npm run lint
npm test
```

## Deployment

Ready for Vercel using `vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-719c35d1`.
