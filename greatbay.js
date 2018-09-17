var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "LaL@1991",
    database: "great_bayDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start() {

    //create user prompts
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Please bid or post an item.",
            choice: ["Bid", "Post"],
        }

    ]).then(function (userInput){
        if (userInput.choice === "Bid"){
            bidAction();
        } else {
            postAuction();
        }
    })
}

function postAuction() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemName",
            message: "What item would you like to post?"

        },

        {
            type: "input",
            category: "itemCategory",
            message: "What category would you like to add your item to?"

        },

        {
            type: "input",
            name: "startBid",
            message: "What would you like to start your bid at?"
        }
    ]).then(function (userInput){
        console.log("You've added")


    })


}


// function bidAuction() {

// }