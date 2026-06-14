<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deployment

- Pushes to `master` run `.github/workflows/deploy.yml`, build and push `ghcr.io/kitsunezu/kitsunezu-portfolio`, then call the Portainer API to redeploy stack `34` on endpoint `3`.
- Keep the Portainer API key in the `PORTAINER_API_KEY` GitHub Actions secret only; do not commit it.
- Portainer sits behind Cloudflare Access. The deploy workflow must pass the service token stored in `CF_ACCESS_CLIENT_ID` and `CF_ACCESS_CLIENT_SECRET` GitHub Actions secrets.
