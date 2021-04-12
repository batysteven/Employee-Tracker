const inquirer = require('inquirer');
const db = require('./db/database');
const cTable = require('console.table');
const router = require('express').Router();
const fetch = require('node-fetch');
const { response } = require('express');



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
                console.table([]);
            }
            if (response.options === 5) {
                console.table([]);
            }
            if (response.options === 6) {
                console.table([]);
            }
        })
}

async function promptDepartments() {
    fetch('http://localhost:3001/api/departments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(main());
}

async function promptRoles() {
    fetch('http://localhost:3001/api/roles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(main());
}

async function promptEmployees() {
    fetch('http://localhost:3001/api/employees', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(main());
}

async function addDepartment() {
    const addingDepartment = await inquirer.prompt({
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
        })
        .then(main());
    
}

async function addRole() {
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
            type: 'input',
            name: 'roleName',
            message: 'Please name your Role.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid Role name.');
                    return false;
                }
            }
        },
    ])
}

main();