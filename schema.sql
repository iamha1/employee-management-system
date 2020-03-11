DROP DATABASE IF EXISTS employeeSystemDB;
CREATE database employeeSystemDB;

USE employeeSystemDB;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role ( 
  id INT UNSIGNED AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee ( 
  id INT UNSIGNED AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);
