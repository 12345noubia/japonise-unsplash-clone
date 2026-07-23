*** Begin Patch
*** Update File: README.md
@@
 ## Runtime
 
 - Default port: `3000`
 - Prefer `process.env.PORT` when binding the server.
 - Bind to `0.0.0.0` in containerized environments.
+- If no port is provided by the host, fall back to `3000`.
*** End Patch
