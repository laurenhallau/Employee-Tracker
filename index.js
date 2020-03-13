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
            "Add Deparment",
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
}