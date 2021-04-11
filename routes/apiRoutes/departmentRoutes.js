const router = require('express').Router();
const db = require('../../db/database');

// Get all departments
router.get('/departments', (req, res) => {
    db.query(
        `SELECT * FROM departments;`,
        function (err, results) {
            res.json(results);
            console.table([], results);
        }
    )
});

// Create new department
router.post('/', (req, res) => {
    const department = {
        name: req.body.name
    }
    var sql = `INSERT INTO departments (name) VALUES (?)`; 
    var values = department;
    db.query(sql, values.name, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

module.exports = router;