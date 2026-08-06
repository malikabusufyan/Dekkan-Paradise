# Dekkan Paradise — Website

MERN stack website for **Dekkan Paradise**, a Hyderabadi Indian (Halal) restaurant in El Paso, TX. Public site (menu, gallery, reviews, contact/ordering info) plus an admin dashboard to manage menu items, gallery videos, reviews, and contact/delivery settings.

## Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT auth, Multer file uploads
- **Frontend**: React (Vite), React Router, Axios

## 1. Set up MongoDB Atlas (free tier)

1. Create a free account/cluster at https://www.mongodb.com/cloud/atlas/register
2. Create a database user (username/password) and allow network access from your IP (or `0.0.0.0/0` for local dev).
3. Copy the connection string — it looks like `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/dekkan-paradise?retryWrites=true&w=majority`.

## 2. Configure environment variables

Copy `server/.env.example` to `server/.env` and fill in:

```
MONGO_URI=<your Atlas connection string>
JWT_SECRET=<any long random string>
ADMIN_USERNAME=<pick an admin username>
ADMIN_PASSWORD=<pick a strong admin password>
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

## 3. Install dependencies

From the project root:

```
npm run install:all
```

(This installs both `server/` and `client/` dependencies. You'll also want `npm install` in the root once, for `concurrently`.)

## 4. Seed the database

Creates the admin account, the full menu (~70 items from the restaurant's menu), placeholder testimonials, and default contact/hours settings:

```
npm run seed
```

Safe to re-run — it won't duplicate menu/reviews if they already exist, and it upserts the admin account.

## 5. Run the app

From the project root:

```
npm run dev
```

This starts the Express API on `http://localhost:5000` and the Vite dev server on `http://localhost:5173` (which proxies `/api` and `/uploads` to the backend). Open `http://localhost:5173`.

## Admin access

Go to `http://localhost:5173/admin/login` and log in with the `ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in `server/.env`. From the dashboard you can:

- **Menu tab**: add menu items (with an optional photo) and delete existing ones.
- **Videos tab**: upload gallery video files (max 60MB) or embed a public Facebook video/reel link, and delete either kind.
- **Reviews tab**: delete any review (including the seeded placeholders — anyone can submit a new one from the public Reviews page).
- **Settings tab**: edit address, hours, phone numbers, Instagram link, and the DoorDash/Uber Eats/Postmates ordering links once you have your restaurant's listing URLs on those platforms (they're blank until you add them — the Contact page falls back to "call to order" until then).

## Notes

- Uploaded images/videos go through `server/src/services/storage.js`. Locally (or on any host without `R2_*` env vars set) they're written to disk under `server/uploads/` and served at `/uploads/...`, which is gitignored. In production, set the `R2_*` vars (see below) to store them in Cloudflare R2 instead — needed because most free hosting tiers wipe local disk on every restart/redeploy.
- The seeded reviews are realistic placeholders, not real Google reviews — replace them via the admin Reviews tab (delete placeholders, and real reviews can be added by anyone from the public site) once you have actual reviews to feature.
- Restaurant hours are seeded as **Wed–Mon, 5 PM–11 PM, closed Tuesdays** per the menu flyer; phone numbers are seeded as 915-259-8520 (primary) and 469-999-6449 (secondary). Both are editable from the Settings tab.

## Deploying (Render + Vercel)

### Backend — Render

1. Push this repo to GitHub (see below), then in Render: **New → Web Service**, connect the repo.
2. Root directory: `server`. Build command: `npm install`. Start command: `npm start`.
3. Environment variables (Render dashboard → Environment):
   - `MONGO_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` — same as local, but **use a new password**, not the one that was ever shared in chat/logs.
   - `CLIENT_ORIGIN` — set this once you have the Vercel URL (step below); can be a comma-separated list, e.g. `http://localhost:5173,https://your-app.vercel.app`.
   - `PUBLIC_SERVER_URL` — Render assigns your service a URL as soon as it's created (e.g. `https://dekkan-paradise-api.onrender.com`); set this to that exact URL.
   - `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_PUBLIC_BASE_URL` — optional but recommended (see Cloudflare R2 section below); leave blank to use ephemeral local disk instead.
   - Render sets `PORT` itself — no need to add it.
4. Deploy, then confirm `https://<your-render-url>/api/health` returns `{"status":"ok"}`.

### Frontend — Vercel

1. In Vercel: **Add New → Project**, import the same GitHub repo.
2. Root directory: `client`. Framework preset: Vite (auto-detected). Build command: `npm run build`. Output directory: `dist`.
3. Environment variable: `VITE_API_BASE_URL` = `https://<your-render-url>/api`.
4. Deploy. Once you have the Vercel URL, go back to Render and update `CLIENT_ORIGIN` to include it (triggers a redeploy).

### Cloudflare R2 (optional, for persistent uploads)

1. In Cloudflare dashboard: **R2 → Create bucket**.
2. Enable public access for the bucket (the free `r2.dev` subdomain is fine to start) — that URL is your `R2_PUBLIC_BASE_URL`.
3. **R2 → Manage API tokens → Create API token** scoped to this bucket — gives you `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`.
4. Your `R2_ACCOUNT_ID` is shown in the Cloudflare dashboard URL/account home. `R2_BUCKET` is the bucket name you created.
5. Add all five as Render env vars — no code or redeploy of logic needed, `storage.js` picks them up automatically and switches from local disk to R2.

### Pushing to GitHub

```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/malikabusufyan/Dekkan-Paradise.git
git push -u origin main
```
