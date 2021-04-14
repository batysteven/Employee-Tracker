const router = require('express').Router();
const db = require('../../db/database');
const main = require('../../index');

// Get all roles
router.get('/roles', (req, res) => {
    db.query(
        `SELECT roles.id, roles.title, roles.salary, departments.name FROM roles
        LEFT JOIN departments ON roles.department_id = departments.id;`,
        function(err, results) {
            res.json(results);
            console.table([], results);
        }
    )
});

// Create a new role
router.post('/newRole', (req, res) => {
    const newRole = {
        title: req.body.title,
        salary: req.body.salary,
        department_id: req.body.department_id
    }
    var sql = `INSERT INTO roles (title, salary, department_id) VALUES (?)`; 
    var values = newRole;
    // console.log(values);
    db.query(sql, values(values.title, values.salary, values.department_id), function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        main;
    });
});

module.exports = router;