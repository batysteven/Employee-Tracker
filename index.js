const inquirer = require('inquirer');
const db = require('./db/database');
const cTable = require('console.table');
const router = require('express').Router();
const fetch = require('node-fetch');
const { response } = require('express');

class employeeTracker {

    // First when app is initiated, prompts user with options
    promptOptions() {
        inquirer.prompt({
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [{ name: "View All Departments", value: 0 }, { name: "View All Roles", value: 1 }, { name: "View All Employees", value: 2 }, { name: "Add a Department", value: 3 }, { name: "Add a Role", value: 4 }, { name: "Add an Employee", value: 5 }, { name: "Update an Employee", value: 6 }]
        })
            .then((response) => {
                if (response.options === 0) {
                    this.promptDepartments();
                }
                if (response.options === 1) {
                    this.promptRoles();
                }
                if (response.options === 2) {
                    this.promptEmployees();
                }
                if (response.options === 3) {
                    this.addDepartment();
                    console.table([]);
                }
                if (response.options === 4) {
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

    promptDepartments() {
        fetch('http://localhost:3001/api/departments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.promptOptions());
    }

    promptRoles() {
        fetch('http://localhost:3001/api/roles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.promptOptions());
    }

    promptEmployees() {
        fetch('http://localhost:3001/api/employees', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.promptOptions());
    }

    addDepartment() {
        inquirer.prompt([
            {
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
            },
        ])
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
            .then(this.promptOptions());
    }

}

new employeeTracker().promptOptions();