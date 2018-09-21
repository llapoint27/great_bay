require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_KEY,
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
            name: "choices",
            message: "Welcome, would you like to POST an auction or BID on an auction?",
            choices: ["Bid", "Post"],
        }

        //based on user's answer the following functions will be called
    ]).then(function (answer) {
        console.log(answer);
        if (answer.choices === "Bid") {
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
            name: "category",
            message: "What category would you like to add your item to?"
        },

        {
            type: "input",
            name: "startingBid",
            message: "What would you like to start your bid at?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        }

    ]).then(function (answer) {
        console.log(answer);

        let objectToAdd = {
            item_name: answer.item,
            category: answer.category,
            starting_bid: answer.startingBid,
            highest_bid: answer.startingBid
        }

        //insert a new item into the DB with the following info:
        connection.query(
            "INSERT INTO auctions SET ?",
          
            objectToAdd,
            function (err, response) {
                console.log("Your auction has been added!");

                start();
            }
        )
    })
}


function bidAuction() {

    connection.query('SELECT * FROM auctions', function (err, results) {
        if (err) throw err;
        itemArray = [];
        results.forEach(key => {
            itemArray.push(key.item_name.toString());
        });


    inquirer.prompt([

        {
            type: "list",
            name: "choice",
            message: "What item would you like to place a bid on?",
            choices: itemArray
        },

        {
            type: "bid",
            name: "highestBid",
            message: "How much would you like to bid?"

        }
    ]).then(function (userInput) {

        //need to validate the bids
        //where do I stop connection?
        console.log("You've updated bid to " + userInput.choice + " \n")
      

            connection.query(
                "UPDATING auctions SET ? WHERE ?",
                [{
                    highest_bid: userInput.highestBid
                },
                {
                    id: choice
                }],
    
                function (err){
                    if (err) throw err;
                    console.log("You bid has successfully updated!");
                } 

                
            )

        


    });
});


}