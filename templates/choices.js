
/**************************************************************************
 *
 * DISPLAY SETTINGS
 *
 *************************************************************************/

var $outputText = $(".output-text");
var $outputResults = $(".output-results");
var $outputPrompt = $(".output-prompt");
var $inputContainer = $("#input-container");
var $currentStage = $('.current-stage');
var $currentTurn = $('.current-turn');
var $playerName = $('.player-name');
var $playerState = $('.player-state');
var $playerHealth = $('.player-health');
var $playerHappiness = $('.player-happiness');
var $playerMoney = $('.player-money');
var $encounterChoice = $('.encounter-choice');


var $healthChange = $(".health-change");
var $happinessChange = $(".happiness-change");

/**************************************************************************
 *
 * DISPLAY FUNCTIONS
 *
 **************************************************************************/

/**************************************************
 * updateStatus: updates the player's status
 **************************************************/

function updateStatus() {
    if(_Turn === 1) {
        $playerName.text(player.name);
        $playerState.text(player.state);
        $playerHealth.text(player.health);
        $playerHappiness.text(player.happiness);
        $playerMoney.text(player.money);
    }
    else {

    //store the image in a variable to prevent removal on refresh
    //var img = $(".status-img").clone();
    //clear the status box to prepare to render new status info
    //var status = $("#status");
    //status.html("");
    //re-insert image
    //status.append(img);
    //this function evaluates the current state of _ShakeTrigger and plays the appropriate sound

    soundTrigger();
    //this function evaluates the current state of _ShakeTrigger and initiates the appropriate animation
    shakeStatusImg();
    //this function evaluates the current state of _ShakeTrigger and initiates the appropriate animation
    //to show the amount of damage or health increase rising from player health

    }
    $playerState.text(player.state);
    $currentTurn.text(_Turn);
}

/****************************************************
 * clearOutput: clears the output screen
 ***************************************************/
function clearOutput() {
    //reset $outputText
    $outputText.html('');
    $outputPrompt.html('<p>' + getCurrentStage().description + '</p>');
    $inputContainer.html('');
    $outputResults.html('');
}

/****************************************************
 * displayChoices: takes a multidimensional array of objects: [[Person,Activity]]
 * it displays the encounter cards for the player to choose.
 * @param {[]} choices - takes a list of people
 ***************************************************/
function displayEncounterChoices(choices) {
    for (i = 0; i < choices.length; i++) {
        var person = choices[i][1];
        var activity = choices[i][0];
        var headerText = '';
        var activityDescription = '';

        if(person.name === 'GAME') {
            headerText = activity.name;
        } else {
            if(person.connection === 0) {
                var personName = person.firstDisplayName;
            } else {
                personName = person.name;
            }
            headerText = activity.name + ' (' + personName + ')';
        }
        if(activity.connection <=1){
            activityDescription = activity.firstDescription;
        } else {
            activityDescription = activity.description
        }

        $inputContainer.append(
            '<div class="span3"> <div class="encounter-choice hero-unit" choice-num="'+ i + '">'
            + '<img class="activity-img pull-right" src="'+IMAGE_DIR+'beverage.png">'
            + "<h1>" + headerText + "</h1>"
            + "<p class='choice-description'>" + activityDescription +"</p>"
            + "<button class='btn btn-primary choice-button btn-large' choice-num='" + i + "'>"+ 'CHOOSE' + "</button>"
            + "</div><!-- end span3 >"
        );
    }

    $(".encounter-choice").click(function () {
        clearOutput();
        //var choice = drawCard(choices, 1)[0]; // choose random card (to play game automatically)
        var choice_num = $(this).attr('choice-num');
        var choice = choices[choice_num];       // get array id of choice
        // note: choices are an array: ['activityId', Person]
        evaluateEncounterChoice(choice[0], choice[1]);      // evaluates encounter
        console.log('chose: ' + choice[0].id + '/' + choice[1].id);
    });
}


/**
 * TODO: duplicates display encounter choices. this is not entirely clear how to do.
 * @param {object} miniGame - an activity object that's a miniGame
 */

function displayminiGameChoices(miniGame) {
    var choices = miniGame.choices;
    var choicesHtml ='<ul class="minigame-choices">';
    for (var i=1; i < choices.length; i++) {
        choicesHtml += '<li class="minigame-choice">' +
        '<a href="#" id="minigame-choice-'+ i + '" choice-data="'+ i +'>'+choices[i]+'</a></li>';
    }
    choicesHtml += '</ul>';

    $('.minigame-choice').click(function(){
        miniGame.run()
    });

    $outputText += choicesHtml;
}



// GAME HELPER FUNCTIONS
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

// GAME SETTINGS
var CURRENT_STAGE = 0;          // currently a fixed amount
var CONNECTION_INCREMENT = 1;   // currently a fixed amount
var TURNS_PER_STAGE = 10;        // currently a fixed amount
var AMT_CHOICES = 4;            // currently a fixed amount, may depend on happiness later
var _GameState = ''
var _Turn = 0;                   // turn count for player starts at 0
var IMAGE_DIR = 'templates/img/'; //use this instead of a string
// GAME FUNCTIONS

/****************************************************
 * getChoices given x choices returns x allowable encounters
 * @param {number} amt - takes the number of persons to get. then gets an action for each of them.
 * @returns {[]} returns an array of encounters based on drawCard
 * TODO: currently people can be duplicated with different actions, both actions and people should be unique in each deck.
 ***************************************************/
function getChoices(amt) {
    // 1. creates array of person choices based on
    // - they have instructions for the current stage AND
    // - they're assigned to this stage OR they have a preexisting connection
    var personChoices = [];
    var stageActivities = _Stages[CURRENT_STAGE.id].activities;
    if(stageActivities.length > 0) {
        person = getPerson('game');
        activity = getActivity(stageActivities.shift());
        // if there are stage activities first, play them one at a time
        return [[activity, person]];
    } else {
        // 2. weights all persons according to preexisting connection
        for (i = 0; i < player.personDeck.length; i++) {
            var person = player.personDeck[i];
            if (person.activities[CURRENT_STAGE.id].length > 0 && (person.stage === CURRENT_STAGE.id || person.connection >= 1)) {
                for (var k = 0; k <= person.connection; k++) {
                    personChoices.push(person);
                }
            }
        }
    }
    // 3. selects x persons from weighted array
    var chosenPersons = drawCard(personChoices, amt);
    var encounterChoices = [];
    // 4. creates a choice array of the selected persons and the actions that can be performed with them (ex: ['hiking', Person]
    for (var i = 0; i < chosenPersons.length; i++) {
        var chosenPerson = chosenPersons[i];
        for (var j = 0; j < chosenPerson.activities[CURRENT_STAGE.id].length; j++) {
            // 5. chooses a person action/combo from this array (encounters)
            var activityId = chosenPerson.activities[CURRENT_STAGE.id][j];
            var activity = getActivity(activityId);
            encounterChoices.push([activity,chosenPerson]);
        }
    }
    return drawCard(encounterChoices, amt);
}

/*****************************************************
 * evaluateGameState checks to see if the game is over or not
 * @returns: not sure what it should return. doesn't need to return
 * anything at the moment.
 *
 * Currently just checks to see if player is below in health or
 * at the default victory condition.
 * TODO: Game loop should refer to victory conditions / goal.
 * *****************************************************/

 function evaluateGameState() {
    // win condition
    if (player.happiness >= 100) {
        player.state = "won";
        $outputText.append("you win!");
    } else if (player.health <= 0) {
        player.state = "dead";
        gameOverSound();
        $outputText.append("you died!");
    } else if (!getCurrentStage()) {
        player.state = "dead";
        gameOverSound();
        $outputText.append("You died of old age!");
    } else if (player.state === "alive") {
        if (player.state === 'alive') {
            renderGame();
            updateStatus();
        } else {
            console.log("Unrecognized game state.");
            updateStatus();
        }
    }
}

/***************************************************
 * takes a person and activity and displays the output, then evaluates the game state
 * this is run once per turn from displayEncounterChoices
 *
 * @param {object} activity
 * @param {object} person
 ***************************************************/
function evaluateEncounterChoice(activity, person) {
    clearOutput();
    // decrease connection to other cards
    // call activity with person as argument: activity(person)
    var activityOutput = activity.run((person));
    $outputText.append("<p>" + activityOutput + "</p>");

    //increase connection to cards
    person.connection += CONNECTION_INCREMENT;
    activity.connection += CONNECTION_INCREMENT;

    evaluateGameState();
}

/************************************************
 * renderGame is the game loop
 ***********************************************/

function renderGame() {
    if(CURRENT_STAGE !== getCurrentStage()) {
        CURRENT_STAGE = getCurrentStage();
        stageIntro();
    }
    var playerDeck = getChoices(AMT_CHOICES);
    _Turn += 1;
    $("#input-container").html("");
    // display choices
    updateStatus();
    displayEncounterChoices(playerDeck);
}

/************************************************
 * initiates the game app
 ***********************************************/
$outputPrompt.html('<p>You have just been born into the world. Choose from the options life gives you below.</p>' +
    '<p>You should be aware that the choices you make will affect the outcome of your life and, potentially, the' +
    'choices and connections you will make later.</p>' +
    '<p>Your goal is to have the highest happiness possible before you die.</p>'+
    '<p>Good luck!</p>');

renderGame();