var BasicCard = require('./basic.js');
var ClozeCard = require('./cloze.js');
var inquirer = require('inquirer')

// var monkeys = new BasicCard("are monkeys cool?", "yes");
// console.log(monkeys.front, monkeys.back);

// var monkeysCloze = new ClozeCard("monkeys are cool", "cool");
// console.log(monkeysCloze.cloze, monkeysCloze.fullText, monkeysCloze.partial);


var chooseCardType = function() {
    inquirer.prompt([{
        type: "list",
        name: "cardType",
        message: "What kind of card do you want to make?",
        choices: ["Basic", "Cloze"]
    }]).then(function(answersType) {
        if (answersType.cardType === "Basic") {
            inquirer.prompt([{
                    name: "basicFront",
                    message: "What is the question?"
                },
                {
                    name: "basicBack",
                    message: "What is the answer?"
                }

            ]).then(function(answersCard) {
                var newBasicCard = new BasicCard(answersCard.basicFront, answersCard.basicBack);

                console.log("Here is your flashcard")
                console.log("--------------------------------")
                console.log("Front: " + newBasicCard.front);
                console.log("Back: " + newBasicCard.back)

                inquirer.prompt([{
                    type: "list",
                    name: "makeAnotherCard",
                    message: "Would you like to create another flashcard?",
                    choices: ["yes", "no"]
                }]).then(function(yesOrNo) {
                    if (yesOrNo.makeAnotherCard === "yes") {
                        chooseCardType();
                    }
                });
            });
        } else if (answersType.cardType === "Cloze") {
            inquirer.prompt([{
                    name: "clozeFront",
                    message: "What is the full phrase?"
                },
                {
                    name: "clozeBack",
                    message: "What words should be omitted from the phrase?"
                }
            ]).then(function(answersCardCloze) {
                var newClozeCard = new ClozeCard(answersCardCloze.clozeFront, answersCardCloze.clozeBack);
                if (newClozeCard.partial === "Error!") {
                    console.log("Please enter words to omit that are contained in the phrase.")
                } else {
                    console.log("Here is your flashcard")
                    console.log("--------------------------------")
                    console.log("Front: " + newClozeCard.partial);
                    console.log("Back: " + newClozeCard.cloze)
                }
                    inquirer.prompt([{
                        type: "list",
                        name: "makeAnotherCard",
                        message: "Would you like to create another flashcard?",
                        choices: ["yes", "no"]
                    }]).then(function(yesOrNo) {
                        if (yesOrNo.makeAnotherCard === "yes") {
                            chooseCardType();
                        }
                    });
                
            });
        }
    });
}

chooseCardType();