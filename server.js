const express = require("express");
const path = require("path");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(fileUpload({
    createParentPath: true,
    safeFileNames: true,
    preserveExtension: 200
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static('uploads'))

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
app.post("/upload", (req, res) => {
    try {
        if (!req.files) {
            res.status(400).send({
                message: 'No file uploaded'
            });
        }

        // Get file extension
        let regex = /\.[0-9a-z\.]+$/i;
        let extension = req.files.upload.name.match(regex);
        console.log(`extension: ${extension}`);

        // Check if blacklisted
        let blacklist = [".exe", ".jar", ".cpl", ".scr"];
        if (blacklist.includes(extension)) {
            res.status(400).send({
                message: 'Invalid file'
            });
        }

        // Generate hash
        let hash = getHash();
        let newName = hash + extension;
        console.log(`newName: ${newName}`);

        // Save to disk
        let file = req.files.upload;
        file.mv('./uploads/' + newName);

        res.send({
            status: true,
            message: 'Success',
            fileUrl: `${newName}`
        });
    } catch(error) {
        res.status(500).send(error);
    }
});

// Generate hash of length 8
function getHash() {
    let chars = '012345678901234567890123456789abcdefghijklmnopqrstuvwxyz';
    let hash = '';

    for (let i = 0; i < 10; i++) {
        hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
};

const { PORT = 5000 } = process.env;

app.listen(PORT, () => {
    console.log('\n', `App running in port ${PORT}`, '\n');
    console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});