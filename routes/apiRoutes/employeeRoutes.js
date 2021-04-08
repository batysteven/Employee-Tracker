const router = require('express').Router();
const db = require('../../db/database');

// Get all employees
router.get('/employees', (req, res) => {
    db.query(
        `SELECT * FROM employees`,
        function(err, results) {
            res.json(results);
            console.table([], results);
        }
    )
});

// Create a new employee
router.post('/', (req, res) => {
    db.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (${userInput})`
    )
});

// Update an employee
router.put('/employee/:id', (req, res) => {
    db.query(
        `INSERT INTO employees SET role_id = ${userInput} WHERE id = ? `
    )
});

module.exports = router;