# Will Stapp Campaign Website

Production-ready Next.js campaign website for deployment on Hostinger managed Node.js Web App hosting.

## Local Development

```bash
npm install
npm run dev
```

## Production Commands

```bash
npm install
npm run lint
npm run typecheck
npm run build
npm run start
```

## Hostinger Runtime

Framework: Next.js

Runtime: Node.js

Node.js requirement: 20.x or newer

Install command:

```bash
npm install
```

Build command:

```bash
npm run build
```

Start command:

```bash
npm run start
```

The app does not require Docker and does not depend on Vercel-only infrastructure.

## Environment Variables

Copy `.env.example` for local development. Do not commit `.env` or `.env.local`.

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Canonical production URL, for example `https://[PRODUCTION-DOMAIN]`. Used for metadata, Open Graph, sitemap and absolute URLs. |
| `FORM_PROVIDER` | Yes | `disabled`, `mock` or `webhook`. Use `disabled` until a real provider is configured. `mock` works only outside production. |
| `FORM_WEBHOOK_URL` | Only for webhook forms | Server-side URL for the selected CRM, newsletter, volunteer or automation provider. |
| `FORM_WEBHOOK_SECRET` | Optional | Server-side bearer token passed to the webhook provider. |

## Forms

The campaign contact form, newsletter signup and volunteer signup all post to the server route at `/api/forms`.

Current adapters:

- `disabled`: production-safe default. Submissions are rejected with an honest message.
- `mock`: development-only adapter. It is explicitly labeled in the response and is blocked in production.
- `webhook`: posts form submissions server-side to `FORM_WEBHOOK_URL`.

To connect a real provider, create or configure a provider endpoint, set `FORM_PROVIDER=webhook`, add `FORM_WEBHOOK_URL`, and add `FORM_WEBHOOK_SECRET` if the provider requires authentication. Server-side secrets must not use the `NEXT_PUBLIC_` prefix.

## Content Management

Campaign content is file-based and lives in:

- `content/site.ts`
- `content/candidate.ts`
- `content/election.ts`
- `content/priorities.ts`
- `content/legislation.ts`
- `content/contact.ts`
- `content/news/`
- `content/events/`

This keeps launch updates manageable through GitHub. The presentation layer reads typed content modules, so a CMS can be connected later by replacing the content source without redesigning the pages.

## Deploying to Hostinger

1. Push the production repository to GitHub.
2. Log into Hostinger hPanel.
3. Create a Node.js Web App.
4. Connect the GitHub repository.
5. Select the production branch.
6. Configure the install/build/start commands.
7. Configure the Node.js version supported by the application.
8. Add required environment variables.
9. Deploy the application.
10. Connect the production domain.
11. Confirm SSL/HTTPS.
12. Verify the canonical domain.
13. Test the complete production site.
14. Verify forms.
15. Verify redirects.
16. Verify `sitemap.xml`.
17. Verify `robots.txt`.
18. Verify metadata/social previews.
19. Test mobile navigation.
20. Run final accessibility and performance checks.

## Hostinger Configuration

Use these settings in Hostinger:

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Runtime | Node.js |
| Install command | `npm install` |
| Build command | `npm run build` |
| Start command | `npm run start` |
| Node.js version | 20.x or newer |

Hostinger-specific values such as the final production domain, production branch name and hPanel app identifier must be selected in Hostinger. Do not assume local environment variables automatically exist in Hostinger.

## Final Production Checklist

- Run `npm run lint`.
- Run `npm run typecheck`.
- Run `npm run build`.
- Confirm `.env` and `.env.local` are not committed.
- Confirm `NEXT_PUBLIC_SITE_URL` points to the production HTTPS domain.
- Confirm form provider settings are real before expecting production submissions.
- Confirm `sitemap.xml`, `robots.txt`, canonical metadata and social previews use the production domain.
