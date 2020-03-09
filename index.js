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
    banner();
});

//Pulled from trilogy
const banner = () => {
    console.log(" ____________________________________________________");
    console.log("|                                                   |");
    console.log("|  _____                  _                         |");
    console.log("| |  ___|_ ___  __  _ ___| | ___  _   _  ___   ___  |");
    console.log("| |  _| | `_  '_  |  _   | |/ _ '| | | |/ _ ' / _ ' |");
    console.log("| | |___| | | | | | |_|  | | |_| | | | |  __/|  __/ |");
    console.log("| |_____|_| |_| |_| ____/|_|'___/|___| |____||____| |");
    console.log("|                 |_|             |___/             |");
    console.log("|  __  __                                           |");
    console.log("| |  '/  | ____ _ __   ____  ___   ___   _ __       |");
    console.log("| | |'/| |/ _' | '_ ' / _  |/ _ ' / _ ' | ,__|      |");
    console.log("| | |  | | |_| | | | | |_| | |_| |  __/ | |         |");
    console.log("| |_|  |_||__,_|_| |_|___,_|___, |____|_|_|         |");
    console.log("|                           |___/                   |");;
    console.log("`---------------------------------------------------'");
};
