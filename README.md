*** Begin Patch
*** Add File: README.md
+# korie / unsplash workspace
+
+This repository appears to contain two top-level app directories:
+
+- `korie`
+- `unsplash`
+
+## Runtime
+
+- Default port: `3000`
+- Prefer `process.env.PORT` when binding the server.
+- Bind to `0.0.0.0` in containerized environments.
+
+## Secrets
+
+- Do not commit Unsplash API keys.
+- Store credentials in environment variables.
+- Use `.env.example` as the template for local setup.
+
+## Notes
+
+If this is a monorepo, add app-level manifests and build scripts inside each package.
+If it is two separate apps, document which directory is the primary deploy target.
*** End Patch