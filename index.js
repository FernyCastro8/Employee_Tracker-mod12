// Dependencies
const node = require('node');
const inquirer = require('inquirer');
const consoleTable = require('console.table')
const mysql = require('mysql');

// question resquet by bussines owner
const userInput = () => {
inquirer
  .prompt([
    {
        type:'input',
        message:'',
        name: '',
        choices: ['']
    },
    {
        type:'input',
        message:'',
        name: '',
        choices: ['']
    },
    {
        type:'input',
        message:'',
        name: '',
        choices: ['']
    },
    {
        type:'input',
        message:'',
        name: '',
        choices: ['']
    },
    {
        type:'input',
        message:'',
        name: '',
        choices: ['']
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
};



