// Dependencies
const inquirer = require('inquirer');
const consoleTable = require('console.table')
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'employ_db'
});


// Function async to return view all employees
const viewEmployees = async () => {
  const results = await db.promise().query('SELECT * FROM employee')
  console.table(results[0])
};

// Function async to return view all departments
const viewDepartments = async () => {
  const results = await db.promise().query(
    "SELECT department.id, department.name FROM department;")
  console.table(results[0])
  };

// Function async to return view all roles
const viewRoles = async () => {
  const results = await db.promise().query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;")
  console.table(results[0])
};

// Function async to return add employees
const addEmployee = async () => {
  const results = await db.promise().query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;")
  console.table(results[0])
};


// question resquet by bussines owner
const menu = async () => {
  const results = await inquirer
    .prompt([
      {
        type: 'list',
        message: 'welcome to employee tracker, what would you like to do?',
        name: 'menu',
        choices: ['View all employees', 'View all departments', 'View all roles', 'Add employee', 'Add deparment', 'Add role', 'Remove deparment', 'Remove role', 'Remove employee']
      }
    ])
  if (results.menu === 'View all employees') {
    viewEmployees();
  } if (results.menu === 'View all departments') {
    viewDepartments();
  } if (results.menu === 'View all roles') {
    viewRoles();
  } if (results.menu === 'View all roles') {
    addEmployee();
  } 
};

menu();

