DROP DATABASE IF EXISTS employ_db;
CREATE DATABASE employ_db;

USE employ_db;

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);


CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role (id),
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);


USE employ_db;


INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');


INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);
    