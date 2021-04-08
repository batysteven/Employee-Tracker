const inquirer = require('inquirer');
const db = require('./db/database');
const cTable = require('console.table');
const router = require('express').Router();
const fetch = require('node-fetch');

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
                fetch('http://localhost:3001/api/departments', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                })
            }
            if (response.options === 1) {
                console.table([]);
            }
            if (response.options === 2) {
                console.table([]);
            }
            if (response.options === 3) {
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
}

new employeeTracker().promptOptions();