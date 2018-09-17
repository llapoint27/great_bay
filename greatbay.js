var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: " ",
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
            message: "Welcome, would you like to POST an auction or BID on an auction?",
            choice: ["Bid", "Post"],
        }

        //based on user's answer the following functions will be called
    ]).then(function (answer) {
        if (answer.choice === "Bid") {
            bidAuction();
        } else {
            postAuction();
        }
    })
}

function postAuction() {
    inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "What item would you like to post?"
        },

        {
            type: "input",
            category: "category",
            message: "What category would you like to add your item to?"
        },

        {
            type: "input",
            name: "startingBid",
            message: "What would you like to start your bid at?"
        }

    ]).then(function (answer) {

        //insert a new item into the DB with the following info:
        connection.query(
            "INSERT INTO auctions SET ?",
            {
                item_name: answer.item,
                category: answer.category,
                starting_bid: answer.startingBid,
                highest_big: answer.startingBid

            },
            function (err, response) {
                console.log("Your auction has been added!");

                start();
            }
        )
    })
}


// function bidAuction() {

//     connection.query('SELECT * FROM', function(err, results){
//         if (err) throw err;
//     });
    
//     inquirer.prompt([

//         {
//             type: "input",
//             name: "item",
//             message: "What item would you like to place a bid on?"
//         },

//         {
//             type: "input",
//             name: "highestBid",
//             message: "How much money would you like to bid?"

//         }
//     ]).then(function (userInput) {
//         console.log("You've entered: " + userInput.itemName);




//     })




// }