const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hnb_performance'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database.');
});

app.get('/api/employee/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM employees WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.json({ success: false, message: 'Database error' });
        if (results.length > 0) {
            res.json({ success: true, employee: results[0] });
        } else {
            res.json({ success: false, message: 'Employee not found' });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));