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
            "Exit"
        ]
    }).then(answers => {
        //starting switch statements
        switch (answers.action) {
            //start new case
            case "View Employees":
              byEmployees();
              startSearch();
              break; 
            case "View Departments":
               byDepartments();
               startSearch();   
               break; 
            case "View Roles":
                byRole();
                startSearch();   
                break;
            case "Add Employee":
                addEmployee();
                break; 
            case "Add Department":
                addDepartment();
                break; 
            // case "Add Role":
            //     addRole();
            //     break;    
            case "Exit":
                connection.end();
                break;
        }
    })
}

function byEmployees(){
    var sql = "SELECT * FROM employee";
    connection.query(sql, function(err, res) {
        if (err) throw err;
        console.table(res);
        startSearch();
    })
};
function byDepartments(){
    var sql = "SELECT * FROM department ";
    connection.query(sql, function(err, res) {
        if (err) throw err;
        console.table(res);
        startSearch();
    })
};
function byRole(){
    var sql = "SELECT * FROM role ";
    connection.query(sql, function(err, res) {
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
    var sql = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
    connection.query(sql, [res.first_name, res.last_name, id], function (err) {
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
                console.log("Department was added successfully!");
                byDepartments();
                startSearch();
            })
        })
};
