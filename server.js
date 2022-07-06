const express = require("express");
const path = require("path");

const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/api/v1", (req, res) => {
    res.json({
        project: "Initial Express Server",
    });
});

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// File upload route
app.post("/upload", (req, res) => {
    console.log(req);
    res.sendStatus(200);
});

// Save file to disk
function saveFile() {
    // Validate / sanitize

    // Create unique hash and store in Postgres

    // Return a success code and URL in array []
}

const { PORT = 5000 } = process.env;

app.listen(PORT, () => {
    console.log('\n', `App running in port ${PORT}`, '\n');
    console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});