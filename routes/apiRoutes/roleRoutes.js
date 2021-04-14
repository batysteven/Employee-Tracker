const router = require('express').Router();
const db = require('../../db/database');

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
    const newRoleTitle = newRole.title;
    const newRoleSalary = newRole.salary;
    const newRoleDept = newRole.department_id;
     
    var sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${newRoleTitle}', '${newRoleSalary}', '${newRoleDept}')`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

module.exports = router;