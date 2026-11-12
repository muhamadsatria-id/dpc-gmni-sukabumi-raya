# AGENTS.md

## Layout
- Two independent apps with **no root `package.json`/workspace**. Run npm from `backend/` or `frontend/`; each has its own lockfile and `node_modules`. Not a git repository.
- Backend is CommonJS + MVC:
  - `src/app.js` bootstraps Express (:5000) and mounts `src/routes/`.
  - `controllers/` handle validation + HTTP responses; `models/` hold SQL; `middlewares/` hold auth/role/error handling; `services/` send OTP via email/WhatsApp; `utils/` hold helpers.
  - `src/config/db.js` is only a lazy MySQL pool. `src/config/multer.js` stores uploads in `backend/uploads/` (served at `/uploads`).
  - `src/database/migrations/` holds numbered schema files; `migrate.js`/`seed.js` are CLI runners; `seeders/` are idempotent.
- Frontend is Vite + React 19, ESM. `App.jsx` is still the stock starter; `layout/` role shells are empty/unreferenced; `components/{admin,anggota,public,superadmin}` and `pages/{auth,admin,internal,public,superadmin}` are empty `.gitkeep` scaffolding. No router is wired.
- Frontend `src/services/` (axios instance + auth/anggota clients) and `src/context/` (AuthProvider/useAuth) exist and are wired in `main.jsx`; no pages consume them yet.

## Commands
```bash
# backend (MySQL must be running)
cd backend && npm run dev           # node --watch src/app.js -> :5000
cd backend && npm start
cd backend && npm run migrate       # apply only new migration files
cd backend && npm run migrate:fresh # DROP gmni_db, recreate, rerun all migrations
cd backend && npm run seed
cd backend && npm run db:reset      # migrate:fresh + seed

# frontend
cd frontend && npm run dev     # vite -> :5173
cd frontend && npm run build
cd frontend && npm run lint    # oxlint
```
- **No tests exist anywhere.** Verify backend by running migrations/seeding and exercising the API; verify frontend with `npm run lint` + `npm run build`.

## Backend gotchas
- `migrate:fresh` **drops `gmni_db`**. `migrate` only runs files not recorded in the `migrations` table. Schema changes to existing tables need a new numbered migration; `CREATE TABLE IF NOT EXISTS` will not alter them.
- `db.js` no longer creates tables or seeds data. `app.js` only checks `SELECT 1` on startup; if the database/tables are missing, run `npm run migrate`.
- Env comes from `backend/.env` (loaded with dotenv in `db.js`/`app.js`); see `.env.example`. Defaults: `localhost`/`3306`/`root`/empty/`gmni_db`. Set `JWT_SECRET` before production.
- Seeder order: komisariat -> anggota -> user -> konten. Default accounts: `superadmin@gmni.local` / `Superadmin123!`, `admin@gmni.local` / `Admin123!`, `anggota@gmni.local` / `Anggota123!`.
- Auth: password login always requires a 6-digit OTP (2FA); OTPs are bcrypt-hashed in `user_otps`, limited to 5 attempts (5 min login / 15 min reset). Access JWT lasts 15 min; refresh tokens rotate and are stored in `refresh_tokens`. With `SMTP_HOST`/`WA_API_URL` unset, OTPs print to the server log in non-production and sending fails in production.
- Roles: `anggota|admin|superadmin`. Content reads are public; content writes require `admin`/`superadmin`; `komisariat` writes and `/api/users` require `superadmin`. `activity_logs` exists but controllers do not write to it yet.
- Routes: `/api/auth` (daftar, masuk, verifikasi-otp, kirim-ulang-otp, lupa/reset-password, segarkan-token, keluar, saya), `/api/users`, `/api/komisariat`, `/api/anggota` (`?q=`, `?komisariat_id=`), `/api/struktural`, `/api/berita`, `/api/timeline`, `/api/galeri`, `/api/tentang-kami`, `/api/karya-ilmiah`, `/api/health`.
- Keep domain tables/identifiers Indonesian (`anggota`, `komisariat`, `anggota_pendidikan`, `anggota_pengalaman_organisasi`; enums `GMNI|KAMPUS`, `D3|D4|S1|S2|S3|Lainnya`). Auth tables are intentionally English. API errors are `{ message: '<Indonesian text>' }`.
- Member writes run in transactions; updates delete/reinsert child rows. Uploads: max 5 MB, JPG/PNG/WEBP/GIF/PDF; old files are deleted on replace/delete.
- CORS is fully open. Vite has no proxy; the frontend calls `http://localhost:5000` via `VITE_API_URL`.

## Frontend gotchas
- Tailwind v4 is installed but **not wired**: `vite.config.js` registers only `react()`, and `index.css` has no `@import "tailwindcss"`. Add `@tailwindcss/vite` + the CSS import before using utility classes.
- `axios` is wired in `src/services/api.js` (base URL from `VITE_API_URL`, bearer token from localStorage, 401 clears the session). `authService`/`anggotaService` wrap the new endpoints.
- `AuthContext.jsx` exports `AuthProvider`; `useAuth` lives in `authContext.js` so oxlint's fast-refresh rule stays clean. Login/OTP pages and routing do not exist yet.
- `react-router-dom` and `lucide-react` remain unused. Plain JS/JSX — no TypeScript source despite `@types/*`. oxlint treats `react/rules-of-hooks` as an error.
