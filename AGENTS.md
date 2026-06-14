<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deployment

- Pushes to `master` run `.github/workflows/deploy.yml`, build and push `ghcr.io/kitsunezu/kitsunezu-portfolio`, then trigger the Portainer redeploy webhook stored in the `PORTAINER_WEBHOOK_URL` GitHub secret.
- Keep the Portainer webhook URL in GitHub Actions secrets only; do not commit it.
