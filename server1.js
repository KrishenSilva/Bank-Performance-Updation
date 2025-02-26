const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Update as per your credentials
    password: '1234',
    database: 'HNB' // Update with your database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Endpoint to fetch employee details by ID
app.post('/getEmployeeDetails', (req, res) => {
    const { epf } = req.body;
    const query = 'SELECT * FROM employees WHERE epf = ?';
    db.query(query, [epf], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database query error.');
        } else if (results.length === 0) {
            res.status(404).send('Employee not found.');
        } else {
            res.json(results[0]);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});