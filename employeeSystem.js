const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const PORT = process.env.PORT || 8080;

require('dotenv').config()
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
})

connection.connect(function (err) {
  if (err) {
    console.log("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  askQuestions();
});

function askQuestions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuChoices",
        message: "Please select from the options in the menu:",
        choices: ["Add Department", "View all Departments", "Add Role", "View all Roles", "Update Role", "Add Employee", "View all Employees", "Remove Employee","Exit"]
      }
    ])
    .then(function (menuAnswers) {
      if (menuAnswers.menuChoices === "Add Department") {
        addDept();
      }
      else if (menuAnswers.menuChoices === "View all Departments") {
        viewDept();
      }
      else if (menuAnswers.menuChoices === "Add Role") {
        addRole();
      }
      else if (menuAnswers.menuChoices === "View all Roles") {
        viewRole();
      }
      else if (menuAnswers.menuChoices === "Update Role") {
        updateRole();
      }
      else if (menuAnswers.menuChoices === "Add Employee") {
        addEmployee();
      }
      else if (menuAnswers.menuChoices === "View all Employees") {
        viewEmployees();
      }
      else if (menuAnswers.menuChoices === "Update Employee Role") {
        updateEmployee();
      }
      else {
        connection.end();
      };
    });
}

// Add Department
function addDept() {
  inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: "Please enter department name:"
    }
  ])
    .then(function (deptAnswers) {
      const departmentName = deptAnswers.deptName;
      connection.query("INSERT INTO department(name) VALUES(?)", [departmentName],
        function (err, data) {
          if (err) {
            throw err;
          }
          console.log(`${departmentName} was added successfully!`)
          //console.table(data);
          askQuestions();
        })
    });
}
//View Departments
function viewDept() {
  connection.query("SELECT * FROM department", function(err, data) {
    if(err){
      throw err;
    }
    console.table(data);
    askQuestions();
})
}

// Add Role
function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "Please enter the title of the role:"
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of this role?"
    },
    {
      type: "input",
      name: "departmentId",
      message: "What is the department ID?"
    }
  ])
    .then(function (roleAnswers) {
      const roleName = roleAnswers.roleName;
      const salary = roleAnswers.salary;
      const deptId = roleAnswers.departmentId;

      connection.query(`INSERT INTO role(title, salary , department_id) VALUES('${roleName}', ${salary}, ${deptId})`,
        function (err, data) {
          if (err) {
            throw err;
          }
          console.log(`${roleName} was added successfully!`);
          //console.table(data);
          askQuestions();
        }
      )
    })
}

//View Role 

function viewRole() {
  connection.query("SELECT * FROM role", function(err, data) {
    if(err){
      throw err;
    }
    console.table(data);
    askQuestions();
})
}

// Add Employee

function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Please Enter Employee's First Name:"
    },
    {
      type: "input",
      name: "lastName",
      message: "Please Enter Employee's Last Name:"
    },
    // {
    //   type: "input",
    //   name: "role_id",
    //   message: "Please Enter Employee's Role ID:"
    // },
    // {
    //   type: "input",
    //   name: "manager_id",
    //   message: "Please Enter Employee's Manager ID:"
    // },
    
  ])
    .then(function (employeeAnswers) {
      const firstName = employeeAnswers.firstName;
      const lastName = employeeAnswers.lastName;
      // const employeeRoleID = employeeAnswers.role_id;
      // const roleId = employeeAnswers.manager_id;

      connection.query(`INSERT INTO employee(first_name, last_name) VALUES('${firstName}', '${lastName}')`,
        function (err, data) {
          if (err) {
            throw err;
          }
          console.log(`${firstName} was added successfully!`);
          //console.table(data);
          askQuestions();
        }
      )
    })
  }
  function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, data) {
      if(err){
        throw err;
      }
      console.table(data);
      askQuestions();
  })
  }

  //Update Employee Role

  function updateRole() {

    connection.query('SELECT * FROM employee', function (err, res) {
      if (err) throw err
      console.table(res)
      inquirer
        .prompt([
          {
            type: 'Number',
            message: 'ID of employee you would like to update?',
            name: 'id'
          },
          {
            type: 'number',
            message: 'What new role ID are you assigning the employee?',
            name: 'role_id'
          }
        ])
        .then(answer => {
          const query = `UPDATE employee SET role_id = '${answer.role_id}' WHERE id = ${answer.id}`
          connection.query(query, function (err, res) {
            if (err) throw err
            //console.log('Role updated.')
            askQuestions();
          })
        })
    })
  }
