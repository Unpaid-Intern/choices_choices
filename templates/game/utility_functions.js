/*************************************************************************************
 * This contains most of the database structure of the game. Most of the minigame logic is stored
 * in activities.js.
 * ***********************************************************************************/

/*******************************************************************
 * UTILITY FUNCTIONS
 ************************************************************************************ */

/****************************************************
 * getRandomInt: returns a random integer including the two ranges.
 * @param min
 * @param max
 * @returns {*}
 ***************************************************/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/****************************************************
 * getSignedNumber: string of signed number
 * @param theNumber
 * @returns {string}
 ***************************************************/
function getSignedNumber(theNumber) {
    if(theNumber > 0){
        return "+" + theNumber;
    }else{
        return theNumber.toString();
    }
}

/****************************************************
 * search: searches for an object matching a given property in an array
 * @param myArray
 * @param property
 * @param nameKey
 * @returns {*}
 ***************************************************/
function search(myArray, property, nameKey){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i][property] === nameKey) {
            return myArray[i];
        }
    }
}

/****************************************************
 * getCurrentStage: returns the current stage (currently set to calculate on fixed turns/stage)
 * @returns {*}
 ***************************************************/
function getCurrentStage() {
    return _Stages[Math.floor(_Turn/TURNS_PER_STAGE)];
}

/****************************************************
 * shuffle: returns a randomly shuffled array
 * @param {[]} array
 * @returns {*}
 ***************************************************/

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/****************************************************
 * drawCard: shuffles an array with duplicates and returns an array unique ones with length specified
 * @param array
 * @param amt
 * @returns {Array}
 ***************************************************/

function drawCard(array, amt) {
    var drawnCards = [];
    array = shuffle(array);
    for (var i=0;i<array.length;i++) {
        if (drawnCards.length < amt) {
            var card = array[i];
            // remove duplicate cards
            for (var j =0; j < drawnCards.length; j++) {
                if (JSON.stringify(card) === JSON.stringify(drawnCards[j])) {
                    drawnCards.splice(j,1);
                }
            }
            // add chosen card
            drawnCards.push(card);
        }
    }
    return drawnCards;
}
