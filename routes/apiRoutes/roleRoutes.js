const router = require('express').Router();
const db = require('../../db/database');

// Get all roles
router.get('/roles', (req, res) => {
    db.query(
        `SELECT * FROM roles`,
        function(err, results) {
            res.json(results);
            console.table([], results);
        }
    )
});

// Create a new role
router.post('/', (req, res) => {
    db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES (${userInput})`
    )
});

module.exports = router;