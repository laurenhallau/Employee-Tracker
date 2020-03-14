// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");

// Creating connection
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "employees"
});

// Error for failed connection
connection.connect(function (err) {
    if (err) throw err;
}); console.log("You're connected!");

//function for inquirer to prompt
startSearch();

// Inquirer prompt function
function startSearch() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Employees",
            "View Departments",
            "View Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Roles",
            // "Delete Employee",
            "Exit"
        ]
    }).then(answers => {
        //starting switch statements
        switch (answers.action) {
            //start new case
            case "View Employees":
              byEmployees();
              break; 
            case "View Departments":
               byDepartments();  
               break; 
            case "View Roles":
                byRole();   
                break;
            case "Add Employee":
                addEmployee();
                break; 
            case "Add Department":
                addDepartment();
                break; 
            case "Add Role":
                addRole();
                break;   
            case "Update Employee Role":
                updateRole();
                break;        
            case "Exit":
                connection.end();
        }
    })
}

function byEmployees(){
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        startSearch();
    })
};
function byDepartments(){
    var query = "SELECT * FROM department ";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        startSearch();
    })
};
function byRole(){
    var query = "SELECT * FROM role ";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        startSearch();
    })
};
function addEmployee () {
    
    let id;
    //Build an array of Current Titles and Title ID's 
    var query = "SELECT role_id, role_title FROM role";
    
    connection.query(query, function (err, res) {
        roles = res;
        //Create array of roles for user to pick from
        let roleCall = [];
        //Build object array of role titles for user to select from
        for (i = 0; i < roles.length; i++) {
            roleCall.push(Object.values(roles[i].role_title).join(""));
        };//End for loop
        
        inquirer.prompt([
        {
            message: "What is the employee's first name?",
            name: "first_name",
            type: "input"
        },
        {
            message: "What is the employee's last name?",
            name: "last_name",
            type: "input"
        },
        {
            message: "What is the employee's role?",
            name: "role_title",
            //Use roleCall array to provide role choices
            choices: roleCall, 
            type: "list"
        }
        ]).then((res) => {
    
    for (i = 0; i < roles.length; i++) {
        if (roles[i].role_title === res.role_title) {
            id = roles[i].role_id;
        };
    };
    var query = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
    connection.query(query, [res.first_name, res.last_name, id], function (err) {
        if (err) throw err;
        // Call primary menu.
        byEmployees();
        startSearch();
      });//End of query connection
    });//connection then
    });//End of first query
  };//end add employee

function addDepartment() {
    inquirer.prompt(
        {
            name: 'department',
            type: 'input',
            message: "Which department would you like to add?"
        }).then(function (res) {
            var sql = "INSERT INTO department (department_name) VALUES (?)";
            connection.query(sql, [res.department], function(err, res) {
                if (err) throw err;
                console.log(res + "Department was added successfully!");
                byDepartments();
                startSearch();
            })
        })
};

function addRole() {
    //Build an array of role choices
    let array = [];
    var query = "SELECT department_id as value, department_name as name FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        array = JSON.parse(JSON.stringify(res)); 
        var questions = [
            {
              type: "input",
              name: "title",
              message: "What is the name of the new role?"
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary of this new role?"
            },
            {
              type: 'list',
              name: 'department',
              message: 'Which department does the new role belong?',
              choices: array
            }];
        
        inquirer.prompt(questions).then(res => {
            const query = "INSERT INTO role (role_title, role_salary, department_id) VALUES (?, ?, ?)";
            connection.query(query, [res.title, res.salary, res.department], function (err, res) {
                if (err) throw err;
                console.log("The role has been added.");
                startSearch();
            });
          });
        });
};
function updateRole () {
    let roles;
    let employee;
    let roleCall = [];
    let currentEmployees = [];
    var query = "SELECT employee_id, first_name, last_name, CONCAT_WS(' ', first_name, last_name) AS employees FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        employee = res;
        //Build an array of Current Titles and Title ID's 
        var query_two = "SELECT role_id, role_title FROM role";
        connection.query(query_two, function (err, res) {
            if (err) throw err;
            roles = res;
            
            //Build object array of role titles for user to select from
            for (i = 0; i < roles.length; i++) {
                roleCall.push(Object.values(roles[i].role_title).join(""));
            };
   
            //Build list of employees for user to select from
            for (i = 0; i < employee.length; i++) {
            currentEmployees.push(Object.values(employee[i].employees).join(""));
        };
            //Build list of roles for user to select from
            for (i = 0; i < roles.length; i++) {
            roleCall.push(Object.values(roles[i].role_title).join(""));
        };
        //Prompt user for which employee and role need to be updated
        inquirer.prompt([
        {
            message: "Which employee's role do you want to update?",
            name: "employee",
            type: "list",
            choices: currentEmployees
        },
        {
            message: "What is the employee's role?",
            name: "title",
            type: "list",
            choices: roleCall
        }
        ]).then((res) => {
        let employee_id;
        let role_id;
        //Find role id based off of role name
        for (i = 0; i < roles.length; i++) {
            if (roles[i].role_title === res.title) {
              role_id = roles[i].role_id;
            };
        };
      //Find employee id based of of employee name
        for (i = 0; i < employee.length; i++) {
         if (employee[i].employees === res.employee) {
            employee_id = employee[i].employee_id;
            };
        };
      var query = ("UPDATE employee SET role_id = ? WHERE employee_id = ?");
      connection.query(query, [role_id, employee_id], function (err, res) {
        if (err) throw err;
        startSearch();
      });
    });
});
});
};