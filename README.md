# Localens Connect

Localens Connect is a Vite + React app with Supabase authentication and data access.

## Run locally

1. Install dependencies:

```sh
npm install
```

2. Create a local environment file:

```sh
cp .env.example .env
```

3. Add your Supabase values to `.env`:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
```

4. Start the dev server:

```sh
npm run dev
```

## Build

```sh
npm run build
```

The production build output is generated in `dist/`.

## Deploy

This project is ready for static hosting on Netlify or Vercel.

### Netlify

- Import the GitHub repository into Netlify.
- Build command: `npm run build`
- Publish directory: `dist`
- Add environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- Deploy the site.

The repo includes `netlify.toml` with an SPA redirect so routes like `/explore` work on refresh.

### Vercel

- Import the GitHub repository into Vercel.
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Add environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- Deploy the project.

The repo includes `vercel.json` with an SPA rewrite for client-side routing.

## Important note about environment files

`.env` was previously tracked in git. For a public repository, move real keys into hosting platform environment variables and rotate any keys that should no longer stay in git history.
