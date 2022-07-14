# cow-box

cow-box is a simple file uploading service with an Express backend, and a React frontend.

You can install and host your own instance easily, by following the instructions below.

Demo: [cow-box.net](https://cow-box.net)

# Installation
1. Clone the git repository to your machine.
2. Make sure you have the required dependencies instaled:
    * [Node.js](https://nodejs.org/en/download), version >= 14.18.0.
    * [PostgreSQL](https://www.postgresql.org/download), version >= 10.
3. Create a database in Postgres containing a single table as defined in [/db/definitions.sql](https://github.com/ejkosu/cow-box/blob/master/db/definitions.sql)
4. Run `npm install` in the root directory of the repository.
5. Replace the contact email in [About.jsx](https://github.com/ejkosu/cow-box/blob/master/src/components/About.jsx#L29) with your desired contact email.
6. Run `npm run build` to build the minified production bundles.
7. Set the following environment variables:
    * COWBOX_PORT - the port that Express will listen on (default 5000).
    * COWBOX_DB_NAME - the name of the Postgres database you created.
    * COWBOX_DB_USER - the name of the Postgres user you want to use.
    * COWBOX_DB_PASS - the password of the Postgres user.
    * COWBOX_DB_PORT - the port to use for Postgres (default 5432).
    * NODE_ENV - 'production' if you want to serve the minified bundles, 'development' if you want to run a local dev server.
8. If you want to run a dev server via Vite, run `npm run dev`.
9. If you want to run the app for production, run `node server.js`.

# Hosting (Linux)
If you would like to host the app on a Linux server, an example configuration is below:
1. Use Nginx as a reverse proxy. [This guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04#step-5-setting-up-nginx-as-a-reverse-proxy-server) is a good tutorial. If you are using Nginx, make sure to set `client_max_body_size 22M` in your server block to accomodate large uploads.
2. Use certbot to setup HTTPS. [This guide](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04) is a good tutorial.
3. Use your init system to run the Express server. [This guide](https://expressjs.com/en/advanced/best-practice-performance.html#ensure-your-app-automatically-restarts) is a good tutorial and provides an example Systemd service. Using an init system or process manager to run the server is ideal, because it automatically restarts the app, starts the app on boot, and automatically sets environment variables.
