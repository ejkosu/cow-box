const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const morgan = require('morgan');
const rateLimit = require('./rateLimiter.js');
const db = require('./db/queries.js');

const app = express();

// Middleware
app.use(fileUpload({
    createParentPath: true,
    safeFileNames: true,
    preserveExtension: 50
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));
app.use('/upload', rateLimit.rateLimiter);

// Routes
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'));

app.get("/about", (_req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/*", (_req, res) => {
    res.redirect("/");
});

// Upload route
app.post("/upload", async (req, res, next) => {
    try {
        // Validation
        if (!req.hasOwnProperty('files') || req.files.upload == undefined) {
            return res.status(400).send('No file uploaded.');
        }

        const { name, size } = req.files.upload;
        if (typeof(name) !== 'string' || name.length >= 59) {
            return res.status(400).send('Invalid file name.');
        } else if (typeof(size) !== 'number' || size > 20971520) {
            return res.status(400).send('File too large.');
        }

        // Get sanitized file extension
        let regex = /\.[0-9a-z\.]+$/i;
        let extension = name.match(regex)[0];

        // Check if blacklisted
        let blacklist = [".exe", ".jar", ".cpl", ".scr"];
        if (blacklist.includes(extension)) {
            return res.status(400).send('File extension not allowed.');
        }

        // Replace filename with 12 random bytes, then insert record into DB
        let newName = crypto.randomBytes(12).toString('hex') + extension;
        try {
            await db.insertUpload(newName, size);
        } catch (error) {
            error.status = 500;
            error.message = 'Error uploading file.';
            return next(error);
        }

        // Insert file to disk
        req.files.upload.mv('./uploads/' + newName);
        res.send({
            status: true,
            message: 'Success',
            newName: `${newName}`
        });
    } catch(error) {
        error.status = 500;
        error.message = 'Error uploading file.';
        return next(error);
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error);
    const status = error.status || 404;
    const message = error.message || 'Invalid.';
    res.status(status).send(message);
});

const { COWBOX_PORT = 5000 } = process.env;

app.listen(COWBOX_PORT, () => {
    console.log('\n', `App running in port ${COWBOX_PORT}`, '\n');
    console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${COWBOX_PORT}/\x1b[0m`);
});