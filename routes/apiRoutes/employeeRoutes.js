const router = require('express').Router();
const db = require('../../db/database');

// Get all employees
router.get('/employees', (req, res) => {
    db.query(
        `SELECT e.id, e.first_name, e.last_name, roles.title, departments.name, roles.salary, Concat(m.first_name, ' ', m.last_name) manager FROM (((employees e 
            LEFT JOIN employees m ON m.id = e.manager_id) 
            INNER JOIN roles ON e.role_id = roles.id) 
            INNER JOIN departments ON roles.department_id = departments.id) ORDER BY e.id;`,
        function(err, results) {
            res.json(results);
            console.table([], results);
        }
    )
});

// Create a new employee
router.post('/newEmployee', (req, res) => {
    const newEmployee = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role_id: req.body.role_id,
        manager_id: req.body.manager_id
    }
    const newFirstName = newEmployee.first_name;
    const newLastName = newEmployee.last_name;
    const newRole_id = newEmployee.role_id;
    const newManager_id = newEmployee.manager_id;

    var sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${newFirstName}', '${newLastName}', '${newRole_id}', '${newManager_id}')`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

// Update an employee
router.put('/employee/:id', (req, res) => {
    db.query(
        `INSERT INTO employees SET role_id = ${userInput} WHERE id = ? `
    )
});

module.exports = router;