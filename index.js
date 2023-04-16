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
  // return db.promise().query('SELECT * FROM employee');
  const results = await db.promise().query("SELECT * FROM employee")

  console.table(results[0]);
  // return results[0];
};

// Function async to return view all departments
const viewDepartments = async () => {
  const results = await db.promise().query("SELECT department.id, department.name FROM department;")

  console.table(results[0]);

};

// Function async to return view all roles
const viewRoles = async () => {
  const results = await db.promise().query("SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;")

  console.table(results[0]);
};



//Function to add employee
// const addEmployee = async () => {
//   const results = await inquirer.prompt([
//     {
//       type: 'input',
//       name: 'name',
//       message: 'Enter the name of the department:',
//       validate: function (value) {
//         if (value.trim() === '') {
//           return 'Department name is required';
//         }
//         return true;
//       },
//     },
//   ]);

// await db.query('INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES (?, ?, ?, ?)', results)
// console.table(results[0])
// };


// Function async to add a department
const addDepartment = async () => {
  const newDepartment  = await inquirer.prompt({
    type: 'input',
    message: 'Enter the name of the department:',
    name: 'departmentName',
    validate: function (value) {
      if (value.trim() === '') {
        return 'Department name is required'
      }
      return true;
    }
  });
  console.log(newDepartment)
  
  const result = await db.promise().query(
    `INSERT INTO department (name) VALUES (?)`,
    newDepartment.departmentName
  );

  console.log(`${result[0].affectedRows} department added.`);
};

const addRole = async () => {
  const departments = await db.promise().query( 
    'SELECT * FROM department');
    const departmentChoices = await departments[0].map(({id, name }) => ({
       name:name,
       value: id
    }))
    // console.log(departmentChoices)

  const newRole = await inquirer.prompt([{
    type: 'input',
    message: 'Enter the name of the role',
    name: 'role'
  },
  {
    type: 'input',
    message: 'What is the salary for the role?',
    name: 'salary'
  },
{
  type: 'list',
    message: 'what department does the role belongs to?',
    name: 'department',
    choices: departmentChoices
}])

console.log(newRole);

const result = await db.promise().query(
  `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`,
  [newRole.role, newRole.salary, newRole.department]
);

console.log(`${result[0].affectedRows} department added.`);
}




// question resquet by bussines owner
const menu = async () => {
  const results = await inquirer
    .prompt([
      {
        type: 'list',
        message: 'welcome to employee tracker, what would you like to do?',
        name: 'menu',
        choices: ['View all employees', 'View all departments', 'View all roles', 'Add employee', 'Add department', 'Add role', 'Remove department', 'Remove role', 'Remove employee']
      }
    ])
  if (results.menu === 'View all employees') {
    viewEmployees().then(() => {menu()})
  } if (results.menu === 'View all departments') {
    viewDepartments().then(() => {menu()})
  } if (results.menu === 'View all roles') {
    viewRoles().then(() => {menu()})
  } if (results.menu === 'Add department') {
    addDepartment().then(() => {menu()})
  } if (results.menu === 'Add role') {
    addRole().then(() => {menu()})
  }
};


menu();

