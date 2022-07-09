const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.COWBOX_DB_USER,
    host: 'localhost',
    database: process.env.COWBOX_DB_NAME,
    password: process.env.COWBOX_DB_PASS,
    port: process.env.COWBOX_DB_PORT
});

async function insertUpload(name, size) {
    try {
        const result = await pool.query(
            'INSERT INTO uploads (name, size) VALUES ($1, $2) RETURNING *',
            [name, size]
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    insertUpload
}