const inquirer = require('inquirer');
const db = require('./db/database');
const cTable = require('console.table');
const router = require('express').Router();
const fetch = require('node-fetch');
const { response } = require('express');
const { promise } = require('./db/database');



// First when app is initiated, prompts user with options
async function main() {
    const promptOptions = await inquirer.prompt({
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [{ name: "View All Departments", value: 0 }, { name: "View All Roles", value: 1 }, { name: "View All Employees", value: 2 }, { name: "Add a Department", value: 3 }, { name: "Add a Role", value: 4 }, { name: "Add an Employee", value: 5 }, { name: "Update an Employee", value: 6 }]
    })
        .then((response) => {
            if (response.options === 0) {
                promptDepartments();
            }
            if (response.options === 1) {
                promptRoles();
            }
            if (response.options === 2) {
                promptEmployees();
            }
            if (response.options === 3) {
                addDepartment();
            }
            if (response.options === 4) {
                addRole();
            }
            if (response.options === 5) {
                addEmployee();
            }
            if (response.options === 6) {
                console.table([]);
            }
        })
}

// get all departments
async function promptDepartments() {
    fetch('http://localhost:3001/api/departments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(main());
}

// get all roles
async function promptRoles() {
    fetch('http://localhost:3001/api/roles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(main());
}

// get all employees
async function promptEmployees() {
    fetch('http://localhost:3001/api/employees', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(main());
}

// Ask user for the name of the new department
async function addDepartment() {
    const addingDepartment = (await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Please name your Department.',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a valid Department name.');
                return false;
            }
        }
    })
        .then(({ departmentName }) => {
            const department = { name: departmentName };
            fetch('http://localhost:3001/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(department),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }))
    main();

}

async function addRole() {

    // Query array for current name's and id's of departments to populate choices for user
    const deptArray = new Promise((resolve, reject) => {
        db.query(
            `SELECT id, name FROM departments;`,
            function (err, results) {
                results.map(dept => {
                    if (dept !== null) {
                        dept = [
                            {
                                name: dept.name,
                                value: dept.id,
                            }
                        ]
                        resolve(results);
                    }
                })
            }
        )
    });

    // ask user for title, salary, and department roles belongs to
    deptArray.then((dept) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Please give a Title to your Role.',
                validate: titleInput => {
                    if (titleInput) {
                        return true;
                    } else {
                        console.log('Please enter a valid Role title.');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Please give a Salary to your Role.',
                validate: salaryInput => {
                    if (salaryInput) {
                        return true;
                    } else {
                        console.log('Please enter a valid Salary for your Role.');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                message: 'Please select the Department this Role belongs to.',
                choices: dept,
                name: "deptName"
            }
        ])
            .then(({ roleTitle, roleSalary, deptName }) => {
                const deptId = dept.map(lookingForId => {
                    if (lookingForId.name === deptName) {
                        let choosenDept = lookingForId.id;
                        const newRole = { title: roleTitle, salary: roleSalary, department_id: choosenDept }
                        fetch('http://localhost:3001/api/newRole', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newRole),
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log('Success:', data);
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            })
                            .then(main());
                    }
                })

            })
            
    });
}

async function addEmployee() {
    // Query array for id and title of roles
    const grabRole = new Promise((resolve, reject) => {
        db.query(
            `SELECT id, title FROM roles;`,
            function (err, results) {
                resolve(results);
                results.map(role => {
                    if (role !== null) {
                        role = [
                            {
                                title: role.title,
                                value: role.id,
                            }
                        ]
                        resolve(results);
                    }
                })
            }
        )
    })
    .then()
    // Query array for id and concat first/last name
    const grabEmployees = new Promise((resolve, reject) => {
        db.query(
            `SELECT id, Concat(first_name, last_name) person FROM employees;`,
            function (err, results) {
                resolve(results);
                results.map(employee => {
                    if (employee !== null) {
                        employee = [
                            {
                                name: employee.person,
                                value: employee.id
                            } 
                        ]
                        console.log(employee)
                        resolve(results);
                    }
                })
            }
        )
    });


}

main();