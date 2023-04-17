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
  const results = await db.promise().query("SELECT role.title, role.id AS role_id, department.name AS department_name, role.salary FROM role JOIN department ON role.department_id = department.id;")

  console.table(results[0]);
};


// Function async to add a department
const addDepartment = async () => {
  const newDepartment = await inquirer.prompt({
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


// Function to add role to department ( role, salary, department )
const addRole = async () => {
  const departments = await db.promise().query(
    'SELECT * FROM department');
  const departmentChoices = await departments[0].map(({ id, name }) => ({
    name: name,
    value: id
  }));

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
};

// Funtion to add employees ( first name, last name, role, and manager )
const addEmployee = () => {
  db.query('SELECT * FROM role', (err, results) => {

    const roleChoices = results.map(({ id, title, }) => ({
      value: id,
      name: title
    }));


    db.query('SELECT * FROM employee', (err, results) => {
      const employeeChoices = results.map(({ id, first_name, last_name, }) => ({
        value: id,
        name: first_name + ' ' + last_name
      }));


      inquirer.prompt([{
        type: 'input',
        message: 'Enter employee first name',
        name: 'first_name'
      },
      {
        type: 'input',
        message: 'Enter employee last name',
        name: 'last_name'
      },
      {
        type: 'list',
        message: 'what role does the employee belongs to?',
        name: 'role_id',
        choices: roleChoices
      },
      {
        type: 'list',
        message: 'Enter manager id',
        name: 'manager_id',
        choices: employeeChoices
      }
      ]).then((newEmployee) => {

        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
          [newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, newEmployee.manager_id]
          , (err, results) => {
            console.log(`new employee added.`);
            menu()
          });
      })
    })
  });
};


const removeDepartment = () => {
  db.query('SELECT * FROM department', (err, result) => {
    const deleteDepartmentChoices = result.map(({ id, name }) => ({
      value: id,
      name: name
    }))
  });

  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Which department would you like to remove',
        name: 'delete_department',
        choices: departmentChoices
      }
    ]).then((departmentDeleted))

  db.query("DELETE FROM department WHERE name = ?;"), departmentDeleted, (err, results) => {
    console.log(`department deleteed.`);
    menu();
  };
};



// Function to updated employee
const updateEmployee = () => {
  // In here we are gonna select from the employees table
  db.query('SELECT * FROM employee', (err, results) => {
    const employeeChoices = results.map(({ id, first_name, last_name, }) => ({
      value: id,
      name: first_name + ' ' + last_name
      //  + " " + //  used to concat both first_name and last_name
    }));

    // In here we are gonna select from the role table
    db.query('SELECT * FROM role', (err, results) => {

      const roleChoices = results.map(({ id, title, }) => ({
        value: id,
        name: title
      }));

      inquirer
        .prompt([
          {
            type: 'list',
            message: "Select an employee you want to updated",
            name: 'employee_id ',
            choices: employeeChoices
          },
          {
            type: 'list',
            message: "Select employee's new role",
            name: 'role_id',
            choices: roleChoices
          }
        ])
        .then((answers) => {
          db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role_id, answers.employee_id], (err, results) => {
            console.log(`Employee Updated.`);
            menu()
          })
        })
    })
  })
};



// Question resquet by bussines owner
const menu = async () => {
  const results = await inquirer
    .prompt([
      {
        type: 'list',
        message: 'welcome to employee tracker, what would you like to do?',
        name: 'menu',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Remove department', 'Remove role', 'Remove employee', 'Update Employee', 'Quit']
      }
    ])


  switch (results.menu) {
    case 'View all employees':
      viewEmployees().then(() => { menu() });
      break;
    case 'View all departments':
      viewDepartments().then(() => { menu() });
      break;
    case 'View all roles':
      viewRoles().then(() => { menu() });
      break;
    case 'Add department':
      addDepartment().then(() => { menu() });
    case 'Add role':
      addRole().then(() => { menu() });
      break;
    case 'Add department':
      addRole().then(() => { menu() });
      break;
    case 'Add employee':
      addEmployee();
      break;
    case 'Remove department':
      removeDepartment();
      break;
    case 'Update Employee':
      updateEmployee();
    default:
      process.exit();
    // ( process.exit )  is used to quit or exit the function.
  }
};

menu();

