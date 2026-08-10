<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deployment

- Pushes to `master` run `.github/workflows/deploy.yml`: install, lint, build, audit production dependencies, build and scan the exact candidate image, push `ghcr.io/kitsunezu/kitsunezu-portfolio`, then call the Portainer API to redeploy stack `34` on endpoint `3`.
- Keep the Portainer API key in the `PORTAINER_API_KEY` GitHub Actions secret only; do not commit it.
- Portainer sits behind Cloudflare Access. The deploy workflow must pass the service token stored in `CF_ACCESS_CLIENT_ID` and `CF_ACCESS_CLIENT_SECRET` GitHub Actions secrets.
- Production npm audit blocks High/Critical findings. Trivy blocks fixed and unfixed High/Critical OS/library findings before image push; `.trivyignore` has no active exceptions, and any future exception requires a CVE, rationale, owner, expiry date, and review.

## Dependencies

- Generated UI components are committed source. The `shadcn` scaffolding CLI is not a runtime dependency; invoke it on demand with `npx shadcn` only when regenerating components.
- Keep `next` and `eslint-config-next` pinned to the same exact version, and validate upgrades with `npm ci`, `npm run lint`, and `npm run build`.
- `sharp` is an explicit production dependency for the standalone `next/image` runtime; keep it pinned to a patched release and verify the final image with Trivy.
- Docker build and runner stages use digest-pinned Node.js 24 LTS images. Refresh the official `node:24-slim` and `node:24-alpine` digests deliberately when updating base-image security fixes.
- The production runner intentionally removes npm, npx, and Yarn; `node server.js` is the only runtime entrypoint.
