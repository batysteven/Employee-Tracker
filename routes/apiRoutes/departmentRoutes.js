const router = require('express').Router();
const db = require('../../db/database');

// Get all departments
router.get('/departments', (req, res) => {
    db.query(
        `SELECT * FROM departments;`,
        function(err, results) {
            res.json(results);
            console.table([], results);
        }
    )
});

// Create new department
router.post('/', (req, res) => {
    db.query(
        `INSERT INTO departments (name) VALUES  (${name})`
    )
});

module.exports = router;