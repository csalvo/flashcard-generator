var BasicCard = require('./basic.js');
var ClozeCard = require('./cloze.js');
var inquirer = require('inquirer')

//make an empty array to save flashcards to. 
//probably should have put stuff in here so that you don't have to create questions before using it
flashcards = [];


//create card logic
var createCard = function() {
    //cloze or basic card?
    inquirer.prompt([{
        type: "list",
        name: "cardType",
        message: "What kind of card do you want to make?",
        choices: ["Basic", "Cloze"]
        //if it's basic, ask for the question and answer, then push them to the flashcards array
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
                //put the question and answer into an objec that gets pushed into the flashcars array
            ]).then(function(answersCard) {
                var newBasicCard = new BasicCard(answersCard.basicFront, answersCard.basicBack);
                var newCardObj = {
                    "front": newBasicCard.front,
                    "back": newBasicCard.back
                }
                flashcards.push(newCardObj);
                console.log("Here is your flashcard")
                console.log("--------------------------------")
                console.log("Front: " + newBasicCard.front);
                console.log("Back: " + newBasicCard.back)
                //ask if the user wants to add another card, if not they have the choice to see the cards
                inquirer.prompt([{
                    type: "list",
                    name: "makeAnotherCard",
                    message: "Would you like to create another flashcard?",
                    choices: ["yes", "no"]
                }]).then(function(yesOrNo) {
                    if (yesOrNo.makeAnotherCard === "yes") {
                        createCard();
                    } else {
                        inquirer.prompt([{
                            type: "list",
                            name: "makeAnotherCard",
                            message: "Would you like to use your flashcards?",
                            choices: ["yes", "no"]
                        }]).then(function(yesOrNo) {
                            if (yesOrNo.makeAnotherCard === "yes") {
                                useCards();
                            }
                        });

                    }
                });
            });
            //cloze cards... ask for whole phrase then part to cut out 
        } else if (answersType.cardType === "Cloze") {
            inquirer.prompt([{
                    name: "clozeFront",
                    message: "What is the full phrase?"
                },
                {
                    name: "clozeBack",
                    message: "What words should be omitted from the phrase?"
                }
                //add to object then push into array
            ]).then(function(answersCardCloze) {
                var newClozeCard = new ClozeCard(answersCardCloze.clozeFront, answersCardCloze.clozeBack);
                if (newClozeCard.partial === "Error!") {
                    console.log("Please enter words to omit that are contained in the phrase.")
                } else {

                    var newCardObj = {
                        "front": newClozeCard.partial,
                        "back": newClozeCard.cloze
                    }

                    flashcards.push(newCardObj);
                    console.log("Here is your flashcard")
                    console.log("--------------------------------")
                    console.log("Front: " + newClozeCard.partial);
                    console.log("Back: " + newClozeCard.cloze);
                }
                //ask if the user wants to make another card, if not ask if they want to use their cards
                inquirer.prompt([{
                    type: "list",
                    name: "makeAnotherCard",
                    message: "Would you like to create another flashcard?",
                    choices: ["yes", "no"]
                }]).then(function(yesOrNo) {
                    if (yesOrNo.makeAnotherCard === "yes") {
                        createCard();
                    } else {
                        inquirer.prompt([{
                            type: "list",
                            name: "makeAnotherCard",
                            message: "Would you like to use your flashcards?",
                            choices: ["yes", "no"]
                        }]).then(function(yesOrNo) {
                            if (yesOrNo.makeAnotherCard === "yes") {
                                useCards();
                            }
                        });

                    }
                });
            });
        }
    });
}




var useCards = function() {
    numberOfCards = flashcards.length;
    counter = 0;
    flipCards();
}

var flipCards = function() {
    if (counter < numberOfCards) {
        console.log(flashcards[counter].front);
        inquirer.prompt([{
            type: "list",
            name: "seeAnswer",
            message: "Want to see the answer?",
            choices: ["yes", "no"]
        }]).then(function(response) {
            if (response.seeAnswer === "yes") {
                console.log(flashcards[counter].back);
                counter++;
                flipCards();
            }
        });
    }
}

createCard();