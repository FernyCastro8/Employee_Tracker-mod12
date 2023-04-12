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

const viewEmployess = async() => {
  const results = await db.promise().query('SELECT * FROM employee')
  console.table(results[0])
}
// question resquet by bussines owner
const menu = async() => {
const results =  await inquirer
    .prompt([
      {
        type: 'list',
        message: 'welcome to employee tracker, what would you like to do?',
        name: 'menu',
        choices: ['View all employees','Vies all departmenst', 'View all roles', 'Add employee', 'Add deparment', 'Add role','Remove deparment','Remove role', 'Remove employee']
      }
    ])
    if (results.menu === 'View all employees') {
      viewEmployess();
    }
}

menu();

