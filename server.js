const express = require("express");
const path = require("path");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/upload", (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        }

        console.log(req.files.upload);

        let file = req.files.upload;

        file.mv('./uploads/' + file.name);

        res.send({
            status: true,
            message: 'Success',
            fileUrl: 'abc123'
        });
    } catch(error) {
        res.status(500).send(error);
    }
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