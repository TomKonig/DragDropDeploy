# DragDropDeploy

Spec Sheet: Ultra‑Simple Self‑Hosted Static Pages Platform

Overview and Goals

This project is an ultra-simple, lightweight static site hosting platform designed as a self-hosted alternative to services like Tiiny.host, Cloudflare Pages, and GitHub Pages. Its core purpose is to enable users to quickly deploy static websites (HTML, CSS, JS, images) with minimal configuration and friction. By focusing only on static content, the system remains serverless on the end-user side – no dynamic server code runs for the hosted sites. Any interactive functionality (forms, etc.) is achieved by posting to external services (e.g. webhooks like Web3Forms) rather than running backend code.

Key Objectives:
	•	Ease of Use: Provide an intuitive, password-protected web dashboard for users to deploy sites in just a few clicks. The goal is a five-minute setup from sign-up to a live site, similar to Tiiny.host’s quick deployment experience ￼.
	•	Self-Hosting & FOSS: The platform will be open-source (MIT licensed) and easily self-hostable via Docker or a simple install script. It should be simple to contribute to and maintain, adhering to “Keep it simple, stupid” principles.
	•	Minimal Configuration: Require only essential setup from the operator (like providing a domain name and basic settings). Users can launch sites without deep technical steps.
	•	Security by Default: Secure default settings (HTTPS, isolated user accounts, encrypted credentials) and use environment variables for sensitive configs to avoid secrets in code or repo.
	•	Extensibility: Use an open, modular design so operators or the community can extend functionality via plugins/integrations (for example, adding support for more static site generators or third-party services).

Technology Stack and Architecture

Language & Frameworks: The project will use widely-adopted, well-documented technologies to maximize community support. On the backend, a Node.js platform (TypeScript) with a framework like Express (minimal, flexible) or NestJS (structured, scalable) will handle the core server logic. Node.js is chosen because many static site build tools (e.g. for React, Gatsby, etc.) are Node-based, and it has a rich ecosystem and community. The frontend will be split into two single-page applications (SPAs) built with a popular framework such as React (or Vue.js) for its large community and library support – avoiding less common choices like Svelte to ensure familiarity and extensive documentation.

High-Level Architecture:
	•	Backend API Server: A RESTful (or GraphQL) API server built with Node.js/TypeScript. This server manages users, projects, build jobs, and serves the static sites. It interfaces with the database (PostgreSQL) and file storage, and executes site build pipelines. The API will also handle authentication (JWT or session-based) for the dashboard UIs.
	•	User Dashboard (Frontend): A React/Vue SPA that allows regular users to manage their own static site projects. It communicates with the backend API. It offers pages for creating projects, uploading site files, viewing deployment status, and managing deployments (update/delete). This UI will be mobile-friendly and very minimalistic for simplicity.
	•	Admin Dashboard (Frontend): A separate React/Vue SPA for the operator (and any admin users) to configure the service and manage all users/projects. It provides administrative settings (like global options, tier management, user admin actions). This is a distinct app from the user dashboard, possibly served on a separate path or port for security. If an operator is logged in, the admin UI will have a toggle/link to switch to the user view, and vice versa for admins who also want to use the service.
	•	Static File Server: The backend also functions as a static file server for the hosted sites. Once a site is built and stored, the server will serve its files over HTTP(S) on the appropriate domain. The server will detect the incoming request’s hostname and route it to the corresponding project’s content directory. This allows one backend instance to host many user sites on different subdomains or custom domains.

Containerization and Deployment: The entire application will be packaged for easy deployment:
	•	A Docker image will be provided for running the app (with Node, the backend server, and a production build of the frontends). This image will be suitable for one-click deploy on platforms like Coolify.
	•	Alternatively, a simple curl-able install script (inspired by Coolify’s installer) will be available for those who prefer installing on a bare server (it will install dependencies, set up the Node app, etc.).
	•	All configuration is via environment variables (for database URL, OAuth keys, etc.), following 12-factor app principles. Using env vars keeps sensitive data out of code and allows easy config changes per environment ￼ ￼.

State Management: The platform will use PostgreSQL as the primary database to store state – this includes user accounts, OAuth integrations, project metadata, deployment records, and settings. PostgreSQL is chosen for reliability and familiarity (and it’s open-source). The app will use an ORM or query builder (like Prisma or TypeORM for Node) for maintainability. All sensitive data in the DB (password hashes, API keys) will be properly encrypted or hashed.

Core Functionality for Users

Project Creation & Deployment

After logging into the user dashboard, a user can create a new “Project” which represents one static website. Creating a project involves giving it a name and optional settings:
	•	Project Name & Subdomain: The name will be used to form the default subdomain for the site (e.g. project “MySite” becomes mysite.myplatform.com). Users will be able to choose from one of the operator-provided base domains if multiple are configured (see Multi-Domain Support below).
	•	Source Upload or Import: The user can then provide the static site content. They have two main options:
	•	Upload Files: Upload a folder or archive (ZIP file) containing the site’s source or pre-built static files. The UI will support drag-and-drop for convenience ￼.
	•	Import from Git: Provide a link to a public GitHub (or GitLab/Bitbucket) repository. The system will pull the repository’s content. (Initially only public repos via unauthenticated HTTPS; future enhancement could allow connecting OAuth for private repos).
	•	Build Settings: Optionally, the user can specify the site generator or build command. The platform will attempt auto-detection of common static site generators (SSGs) if no explicit config is given. For example:
	•	Presence of a package.json with a build script might indicate a Node-based SSG (like Next.js, Gatsby, or Eleventy).
	•	A config.toml or config.yaml could indicate a Hugo project.
	•	A _config.yml may indicate Jekyll.
If auto-detected, the system will choose the appropriate build pipeline; otherwise, the user can select from a list of supported SSGs or input a custom build command.
	•	Trigger Build: The user hits a “Build & Deploy” button. The backend then:
	1.	Stores the uploaded source (if from upload) in a temporary build directory or retrieves the Git repo.
	2.	Runs the build process for the project:
	•	For purely static uploads (just HTML/CSS/JS files with no build needed), this step is trivial – the files are directly prepared for serving.
	•	For known SSGs, the app runs the appropriate build command. For instance, if Hugo is detected, the app will run hugo to generate the public folder. If a Node-based project, it might run npm install followed by npm run build (with safe defaults or user-specified commands).
	•	The platform will auto-download required dependencies if not already present. For example, if building a Hugo site, the backend will fetch the Hugo binary (at the version specified by an environment variable HUGO_VERSION or default to latest) and execute it. Similarly for other SSGs, it may include binaries or utilize package managers (npm, pip, etc.) as needed. The goal is to support common SSGs out-of-the-box (Hugo, Jekyll, Gatsby, Next.js static export, Eleventy, etc.) by bundling or fetching their tooling in the build environment.
	3.	Capture build output: The static files produced by the build (e.g. the Hugo public/ directory, or whatever directory is configured for output) are collected.
	4.	Deploy to hosting: Move the build output into the hosting location for that project. Depending on operator settings, this could mean:
	•	Saving the files to a directory on local disk (e.g. under /data/projects/<project_id>/current/).
	•	Or uploading the files to an S3-compatible storage bucket (if remote storage is configured for deployments).
	•	Live Site: Once deployed, the site becomes accessible at the project’s URL (such as http://mysite.{base-domain} or a custom domain the user linked). The platform will have automatically configured routing so that the files are served when that URL is accessed.

Throughout this process, the dashboard will show the build status (in progress, success, or errors if build failed), so the user gets feedback. The design will strive to make this process as one-click as possible after the initial setup, hiding complexity of the build.

Managing Deployments (Updates & Versions)

After the initial deployment, users can manage their static site easily:
	•	New Deployments (Updates): To update the site, the user can upload a new version of the site (or re-import from Git). The UI will provide an “Update Deployment” or “New Deploy” button. When a new deployment is uploaded, it goes through the same build process, and on success it replaces the currently served version of the site.
	•	Version History (Optional): If the operator has enabled versioning, the platform can retain old versions of deployments. For example, if versioning is on, each time the user deploys, the previous version’s files are stored (e.g. in /data/projects/<id>/versions/v1, v2, etc., or in versioned folders in S3). The UI can show a list of past deployments with timestamps. The operator can set a max number of versions to retain per site (for instance, keep last N deployments). If that number is exceeded, the oldest version is automatically deleted (rolling retention).
	•	Rollbacks: If versions are stored, the user (or admin) could roll back to a prior version with one click, essentially restoring an older set of files to “current”. This is an optional nice-to-have if versioning is enabled.
	•	Delete Project: Users can delete a project via the dashboard. This will remove the site from serving (the subdomain will no longer resolve to content), and optionally delete the stored files and history. (There may be a safeguard where the data is soft-deleted or archived for admin to restore if needed, depending on operator’s retention settings.)

The focus is on simplicity: no complex Git integrations or CI pipelines are required (though in future, integration with Git webhooks for automatic rebuild on commit could be added). The user simply uploads new content when they want to update their site. This simplicity mirrors Tiiny.host’s approach where uploading files gives an instant site ￼.

Snippets Injection (Custom HTML in <head>)

To give users and operators flexibility in adding small dynamic touches or analytics, the platform supports “universal snippets.” This feature allows injection of custom HTML/Script into the <head> of every page of the hosted static sites:
	•	User Snippets: A user can define snippet code (for example, a Google Analytics tracking script or a CSS override) in their project settings. When their site is built or served, the system will automatically insert this snippet into the <head> of each HTML page. Implementation-wise, after the static site is generated, the platform can programmatically open each HTML file and inject the snippet before the closing </head> tag. This saves the user from modifying their site generator templates for simple global additions.
	•	Operator Snippets: The operator (admin) can likewise set a global snippet that applies to all hosted sites (if enabled). For instance, an operator might inject a meta tag, a analytics script for their entire platform, or a piece of banner HTML. The operator can toggle whether their global snippet is active on all user sites.
	•	Both snippet types should be stored in the database (probably in a text field per project for user snippet, and a global setting for operator snippet). The injection occurs during deployment (recommended, so the static files on disk already contain the snippet). This approach avoids performance overhead at request time and ensures even when served from static storage or CDN, the snippet is present.

Multi-Domain Support

The application will support multiple base domains for serving sites:
	•	The operator can configure multiple Fully Qualified Domain Names (FQDNs) that they own (e.g. example.com, example.org) as host domains for user sites. Perhaps the operator provides a list in an environment variable or admin setting.
	•	When a user creates a project, they can choose which base domain to use for their site’s subdomain. For example, a user might choose either projectName.example.com or projectName.example.org from a dropdown of allowed domains.
	•	Internally, the server’s routing logic will treat each [projectName].[domain] combination as a unique site and map it to the correct content.
	•	Custom Domains (User-provided): Additionally, if the operator allows (likely as a higher-tier feature), users can bring their own custom domain (e.g. mysite.com). In such cases:
	•	The user would add their domain in the project settings (or a “Domains” section) and be given instructions (like “CNAME your domain to <projectName.base-domain> or an A record to the server’s IP”).
	•	The operator/admin must have configured wildcard SSL certificates or an ACME solution to generate SSL for these custom domains. The platform can integrate with Let’s Encrypt via DNS challenge (especially if behind a reverse proxy like Traefik that handles it) or use Cloudflare’s SSL if tunneling.
	•	The user must verify ownership by adding a DNS record (similar to Tiiny.host’s domain verification process where you add a provided record and then confirm ￼). Once verified, the custom domain is linked to the project.
	•	The platform will then respond to requests for that custom domain by serving the project’s files. This likely requires the server (or proxy) to have a certificate for that domain. If using Traefik, Traefik can manage a wildcard cert or per-domain certs automatically via Let’s Encrypt. If not, the platform itself could integrate something like Caddy or certbot to obtain certificates.
	•	Wildcard Subdomain Setup: For the base domains that the operator configures, they should set up a wildcard DNS entry (e.g. *.example.com) pointing to the server, and ideally a wildcard SSL certificate (or rely on Let’s Encrypt wildcard via DNS challenge). This allows any projectName.example.com to resolve without manual DNS entries for each new project. The platform’s compatibility with Traefik and Cloudflare Tunnels comes into play here:
	•	Traefik: The platform can be run behind Traefik (in Docker). The recommended setup is to use a wildcard Host rule. For example, a Traefik label can catch HostRegexp: {subdomain:.+}.example.com and route it to this application’s container. Traefik can manage the TLS using a wildcard cert or on-the-fly cert generation (using the DNS challenge for wildcard cert is common ￼). We will document the needed Traefik configuration so that operators get automatic subdomain routing and HTTPS.
	•	Cloudflare Tunnels: If using Cloudflare Tunnel, the operator can configure a tunnel to route the wildcard domain traffic to the app. Cloudflare can manage certificates at the edge, so the app can even run without worrying about TLS (traffic from Cloudflare to the app can be http or use Cloudflare’s cert). Essentially, the platform will work in these scenarios by not assuming direct internet exposure but allowing a proxy or tunnel to handle the networking.
	•	The admin dashboard will have a section to manage these domains (add/remove allowed domains). If multiple are present, users get to pick one when creating a site.

Static Site Serving

Once a site is deployed, serving it efficiently is critical:
	•	The backend will serve static files directly (using a high-performance static file middleware or library). Frameworks like Express can serve static content, but for efficiency, we may integrate a file-server module or use caching. Since the content is static, it’s cacheable – possibly the app could set HTTP cache headers for assets.
	•	We aim for secure and speedy delivery. All sites will be served over HTTPS by default. Using the above-mentioned proxy setups or built-in ACME, the platform ensures the user sites have SSL (similar to how Tiiny.host provides included SSL for custom domains ￼).
	•	If using external storage (S3 or similar) for the static files, the application might not directly serve files. An alternative approach in that case: the platform could upload the static files to S3 and possibly use a CDN (CloudFront, etc.) for delivery. However, to keep things simple, initially the app itself will serve files, even if they reside in S3 (the app can fetch from S3). Operators can later integrate a CDN in front if desired for heavy traffic.
	•	Paths and Routing: Each project’s files are served at the root of its domain. There’s no URL rewriting or app logic needed beyond delivering the correct file for the request path. The exception is if a static site expects SPA client-side routing (e.g. a React single-page app where unknown routes should serve index.html), we might provide an option to enable an “SPA mode” per project, which means the server will always serve index.html for any 404 on that site. This is a feature often needed for React/Vue SPAs.
	•	The platform will ensure isolation between projects – one project cannot access another’s files. This is straightforward since each project’s static assets live in separate directory prefixes or buckets, and we route strictly by hostname.

Multi-Tenancy and User Management

While the platform can be run for a single user (the operator themselves), it also supports multi-user mode:
	•	Operator vs Admin vs Users:
	•	The Operator is essentially the owner of the whole service (usually the self-hosting person or organization). They have full control, including server-level settings. The first user (created via initial local admin or first OAuth login) becomes the operator by default.
	•	Admin roles can be assigned by the operator. Admins can access the Admin Dashboard to manage other users and sites, but they might not have access to certain operator-only settings (like billing configurations or critical system toggles).
	•	Regular Users are those who sign up to host their sites. They can only see and manage their own projects in the user dashboard.
	•	Authentication: The system supports two authentication modes:
	•	Local Auth (Username/Email + Password): Out-of-the-box, the platform has local auth for simplicity. The operator account is created on first launch with a default password (which is immediately required to be changed on first login, for security). Passwords are stored securely using strong one-way hashing (e.g. bcrypt) – when the user said “base64 encrypted”, we interpret this as encoding the hashed password for storage, but we will in fact use a salted hash to ensure security.
	•	OAuth Login: Operators can configure OAuth providers (like Google, GitHub, etc.) by providing OAuth app credentials via environment variables. If OAuth is configured, the login screen will offer those options. On a fresh install with OAuth enabled, the first person to log in via OAuth will be assigned as the admin/operator automatically (since no local admin was set). OAuth can be disabled by the operator (e.g. via a debug mode env var) if only local accounts are desired – however, using OAuth is recommended for convenience and security (no password management).
	•	The admin interface will allow the operator to connect multiple OAuth providers if desired (bring your own app credentials for each).
	•	Registration & User Onboarding: The operator can decide if new user sign-ups are allowed:
	•	Closed system: Only the operator/admin can create user accounts (or invite users).
	•	Open sign-ups: Anyone can register an account (potentially with email verification step).
	•	Invite-only: Registration requires an invite code (the operator can generate invite codes to control growth).
	•	During onboarding of the operator (initial setup), if using local auth initially, the system will prompt to change the default admin password immediately for security. The admin dashboard will also have a method to reset the admin password (e.g. a CLI command or a special environment variable that can be set to a new password hash in case of emergency).

User Dashboard Features:
	•	Each user can create and manage up to their allowed number of projects. They can see a list of their projects, each with its current status (deployed, last updated time, etc.).
	•	Project management UI allows deploying new version, viewing past versions (if enabled), setting custom domain, and adding snippet code.
	•	Users can also see usage metrics if applicable (e.g. how many builds they’ve done this month, bandwidth used, etc., especially if on a limited free tier).

Admin Dashboard Features:
	•	Global Settings: Manage environment-specific settings through UI (for those not set via env vars). E.g. configure SMTP for emails (if we send invite emails or notifications), toggle features (enable/disable new sign-ups, require email verification, enable certain SSG support, etc.), and manage the list of allowed base domains for sites.
	•	User Management: View list of all users, with ability to adjust their details:
	•	Promote/demote admin roles.
	•	Set custom limits or plan for a specific user (override default tier limits).
	•	Lock or ban a user (prevent login and/or take their sites offline).
	•	If using an invite system, generate or revoke invite codes.
	•	Project Management: Admins can see all projects in the system. They can intervene if needed:
	•	Take down a project (e.g. if it violates terms, this would unpublish the site).
	•	Increase a specific project’s quota (e.g. allow a larger site for a particular user).
	•	Delete projects (with or without deleting the user account).
	•	Tier & Plan Configuration: If the operator chooses to use a tiered model (useful if they plan to offer a hosted service or just to impose limits):
	•	Define plans (e.g. Free, Pro, etc.) with configurable limits:
	•	Number of projects per user.
	•	Maximum storage per project or total (e.g. 100 MB on free tier).
	•	Maximum bandwidth (maybe not enforced in first version, but at least tracked).
	•	Build frequency or build minutes (e.g. limit how many builds per hour or how long builds can run, to prevent abuse).
	•	Whether custom domain is allowed on that tier.
	•	Whether password-protection of sites (if we implement that) is allowed.
	•	etc.
	•	Assign users to a tier. Possibly integrate with payments externally (the app itself might not handle payments, but operator could manually mark a user as Pro, etc. Future integration with Stripe API could be an extension).
	•	Monitoring: The admin UI can show system status – e.g. disk usage, number of sites, maybe simple analytics like total hits (especially if multi-tenant, operator might want to see if usage is within server capacity). This can be minimal initially, but open to extension.

Build Pipeline Implementation

Supporting various static site generators (SSGs) is a key requirement. The platform will include a build service component (which could just be part of the backend server or a separate worker process if needed for concurrency) that handles the compilation of sites:
	•	We will maintain build templates or presets for common SSGs:
	•	Hugo: Use the hugo CLI. The Docker image can include the Hugo binary (with a default latest version, and support overriding via an env var for specific version if needed). Hugo being a Go binary is easy to include and run. It’s known for very fast builds ￼.
	•	Jekyll: Since Jekyll is Ruby-based, we have two options – either include a Ruby environment in our container (which increases complexity), or encourage using a containerized build. A possible approach: if a Jekyll site is detected, we could spin up a temporary Docker container (using the official Jekyll image) to perform the build. However, for initial simplicity, we might include Ruby and Bundler in the image to run Jekyll builds directly. Operators can choose to enable/disable Jekyll support based on if they want Ruby in the environment.
	•	Node.js SSGs (React static, Gatsby, Next.js, Eleventy, Vue/Nuxt static): The container will have Node.js and npm/yarn. For a Node-based project, the build steps usually involve installing dependencies (npm install) and then running a build (npm run build). We will implement safeguards to prevent extremely large installs from overwhelming the system (perhaps limit package install size or run builds in a resource-limited environment).
	•	Others: We can support additional ones like Pelican (Python) or Zola (Rust) if needed, likely by including those binaries if popular. The design will allow adding new build pipelines easily via configuration or small script additions.
	•	Build Isolation: Each build will run in an isolated folder (and possibly within a restricted subprocess). We must ensure one user’s build can’t interfere with others:
	•	The backend can queue builds if multiple are triggered simultaneously, or run them in parallel threads if resources allow. We will implement a simple queue to avoid running too many concurrent processes (which could thrash CPU).
	•	Consider using a job runner like Bull (for Node) or a minimal internal queue to manage build tasks.
	•	In future, using container isolation per build (like launching a ephemeral Docker builder) could improve security, but initially, we stick to local processes for simplicity, trusting that this is a controlled environment by the operator.
	•	Configurable Build Environment: The operator can supply environment variables to customize the build environment. For example, a specific NPM registry, proxy settings, or specific version env vars for SSGs (like HUGO_VERSION, JEKYLL_VERSION). The platform will document these and ensure the build process picks them up.
	•	After build, the results are stored as described in the user section, and a success/failure status is logged. Build logs can be surfaced in the UI (to help users debug if their site failed to build).

Storage and Data Management

Static File Storage: The platform is flexible in where it stores the generated static files for each site:
	•	By default, it will use local filesystem storage on the server hosting the app. This is straightforward: files live alongside the app (e.g. in a Docker volume or host path).
	•	We will integrate support for S3-compatible object storage as an alternative. The operator can provide S3 credentials/endpoint via env vars (for AWS S3, or Backblaze B2, Cloudflare R2, or a self-hosted MinIO). If enabled, after building a site, the app will upload the files to the S3 bucket (perhaps under a prefix per project). The serving of files then can either be:
	•	The app still serving them by proxying from S3 (not ideal performance-wise), or
	•	The user’s site domain could be pointed directly to the bucket or a CDN in front of the bucket. However, that complicates domain routing and SSL, so likely the app continues to serve but can cache from S3.
	•	Alternatively, if using S3, the app might use a cloudfront-style CDN and just redirect requests. This might be an advanced setup left to the operator. In initial version, S3 support is mainly for storage durability, while the app fetches and serves.
	•	Snapshots for versioning (if enabled) will either be stored as separate folders (local or S3 prefixes) or zipped and stored to save space.
	•	Database: PostgreSQL holds metadata (users, projects, settings). It does not need to store site files (which are on disk or S3) except maybe small text content (like the snippets, which are just strings). Each project record might store the path or S3 key where the current deployment lives, and a history of deployment references if versioning.
	•	We will ensure all database access goes through parameterized queries/ORM to avoid injection, and the connection string (with password) is provided via env var for security.

Backups: Since this is self-hosted, backup strategies are at operator’s discretion. We will recommend best practices:
	•	Using database backups (regular pg_dump) for PostgreSQL.
	•	If using local FS storage, the operator can use external backup tools (Duplicati, restic, etc.) to back up the projects file directory. This is outside the app, but easy to do. We may include a simple export feature in admin UI to download a project’s files (similar to Tiiny.host offering a ZIP download of the site ￼).
	•	If using S3, data durability is handled by the storage provider, but the database should still be backed up.

Security Considerations

Security is paramount since multiple users and sites are involved:
	•	Authentication Security: All passwords (for local auth) are hashed with a strong algorithm (bcrypt/argon2) and stored (possibly base64-encoded) in the database – no plaintext or reversible encryption. Password reset flows (if implemented for users) will use secure tokens via email.
	•	Dashboard Protection: The user and admin dashboards require login. We will implement proper session management or token auth. We’ll also include protections like rate-limiting login attempts (to mitigate brute force) and an option for 2FA in the future.
	•	Network Security: The app will enforce HTTPS for the dashboards and use secure cookies if applicable. When behind proxies, document how to ensure the proxies handle TLS.
	•	Isolation: Users cannot see or affect each other’s projects. The API will perform authorization checks on every request (e.g. user can only fetch their own project info, only admins can access admin endpoints).
	•	Environment Variables: All sensitive config (database credentials, OAuth client secrets, etc.) are provided via env vars and not baked into images or code. This aligns with best practices for separating config from code ￼. We’ll encourage using Docker secrets or vault integrations for truly sensitive stuff if possible.
	•	Reset Mechanism: Provide a CLI or environment-trigger to reset the admin password (in case the operator is locked out). For example, running the container with an env RESET_ADMIN=true could on startup generate a new admin password and print it to logs, then exit. This ensures the operator always has a backdoor to recover access if needed.
	•	Updates: Being FOSS, we will document an upgrade path (since dependencies like Node or frameworks should be kept updated for security). Perhaps provide a rolling Docker tag updates.

Additional Features and Extensibility

Although the core spec is minimal, the design will allow adding features over time:
	•	Analytics: While not built-in at first, the snippet system allows users to add analytics (Google Analytics, Plausible, etc.) easily. We may consider adding built-in simple analytics for users in the future (similar to Tiiny.host’s dashboard showing page views ￼).
	•	Templates: In the future, the operator could add some starter templates for users to choose from when creating a new project (e.g. a basic coming-soon page template, a portfolio template). This could lower the barrier for non-technical users.
	•	Plugin System: The backend could be designed to load “plugins” or modules (perhaps via config) – e.g. a plugin to enable a form handling service integration, or a plugin to deploy to a CDN. This keeps the core clean but extensible.
	•	APIs: Expose APIs so that power users could programmatically trigger deployments (CI integration). For instance, a user could hit an endpoint with an API token to trigger a rebuild from the linked Git repo (enabling CI/CD workflows if they want).
	•	CLI Client: Possibly provide a small CLI tool for users (in addition to the web UI) to upload and deploy sites (for those who prefer terminal or want to script things).

Deployment and DevOps Considerations

This application is designed to be deployed easily by self-hosters:
	•	Docker Deployment: The primary distribution is a Docker image. It will contain:
	•	The Node.js backend server.
	•	The compiled frontend assets for both dashboards (served perhaps by the backend or by a lightweight static server within the container).
	•	The necessary runtime for builds: Node, npm, Python (if needed for some SSGs), possibly Ruby, Hugo, etc. (We will try to balance the image size with completeness of build tools).
	•	The image will expose a port (e.g. 3000) for HTTP. In production one would run it behind Traefik/nginx/Caddy for domain handling, or directly if using tunnels.
	•	Resource Requirements: Relatively lightweight – static sites themselves are just files, and builds are short-lived. We’ll recommend at least 1 CPU and 1-2 GB RAM for the container to handle small build tasks (similar to recommendations for other small web apps ￼).
	•	Coolify Integration: We will provide a one-click template for Coolify (a popular self-hosted PaaS). This likely means a preconfigured Docker compose or a manifest that Coolify can use, with all environment variables documented. Since Coolify can manage databases, we might integrate with that (or just require a Postgres URL from the operator).
	•	Scalability: In early versions, one container may suffice for moderate usage. All components are in one process. For higher scale, one could separate the static file serving to a CDN and have the Node API handle just management. Similarly, the database can be on a separate host if needed. We will design stateless application behavior (aside from the DB and storage) so it can horizontally scale if an operator wanted to run multiple instances behind a load balancer (ensuring they share DB and storage). This is out-of-the-box if needed, since session state can be JWT-based or stored in DB.
	•	Logging and Monitoring: The app will output logs (access logs for site requests, and application logs for builds and errors). We’ll use a standard format for easy ingestion by log tools. Admins can view recent logs via the admin UI perhaps for convenience. For monitoring, basic health endpoints will be present (so docker orchestration knows it’s running).

Conclusion

This spec outlines a complete solution for a self-hosted static page hosting platform that emphasizes simplicity, security, and extensibility. By using mainstream technologies (Node.js, React, Postgres) and focusing on a minimal feature set for static site deployment, it ensures that even small teams or individual developers can deploy and maintain it. The result will be a FOSS application where a user can log into a clean dashboard, drag-and-drop a site, and have it live on a custom URL within minutes ￼ ￼ – all under the operator’s control and branding.

By keeping the scope to static content and offloading any dynamic needs to external services (webhooks, third-party APIs), we avoid the complexity of server-side computing for user sites. This yields a secure-by-default, low-maintenance hosting solution. Operators can enable multi-tenancy and even offer it as a service (with custom tiers and limits), or just use it privately for their own projects. In either case, the system is designed to require minimal intervention once set up – it automates domain management, builds, and deployments as much as possible.

Finally, being open-source MIT, we welcome community contributions. Developers can easily get involved thanks to the choice of popular frameworks and a straightforward codebase. The project aims to have clear documentation and a modern, simple UI/UX so that onboarding new users (and new contributors) is frictionless. This spec covers the foundational features; future community-driven enhancements can further expand its capabilities while adhering to the core philosophy of simplicity.

Sources:
	•	CrazyEgg, Tiiny Host Review – noted the quick setup and ease of uploading static files, as well as custom domain support in a static hosting context ￼ ￼. These guided our focus on an intuitive dashboard and subdomain/custom domain features.
	•	Dev.to – on using environment variables for configuration and keeping secrets out of code ￼, aligning with our security practices.