var _ShakeTrigger = false;

/**
 * the player stores basic variables about the player's character.
 * @type {{name: string, state: string, health: number, happiness: number, inventory: Array, attributes: Array, obituary: Array}}
 */
var player = {
    name: "Nathan",
    state: "alive",
    health: 15,         // player dies when it reaches 0
    happiness: 10,      // player loses or gains options when it increases/decreases
    inventory: [],
    attributes: [],
    obituary: []
};

player.updateHealth = function(number) {


    this.health += number;
    if( number < 0)
    {
        _ShakeTrigger = true;
    }
    else
    {
        _ShakeTrigger = false;
    }

};

player.updateHappiness = function(number) {
    this.happiness += number;
};

player.removeInventory = function(item) {
    this.inventory.push(item);
};

player.addInventory = function(item) {
    this.inventory.splice(item);
};

player.addAttribute = function(attr) {
    this.inventory.push(attr);
};

player.removeAttribute = function(attr) {
    this.inventory.splice(attr);
};

// sets up array for obituary.
for (var i=0; i < stages.length; i++) {
    player.obituary.push([i]);
}

/**************************************************************************
 *
 * DISPLAY SETTINGS
 *
 *************************************************************************/

var output_text = $("#output-text");
var output_prompt = $("#output-prompt");
var input_container = $("#input-container");
var $current_stage = $('.current-stage');
var $

/**************************************************************************
 *
 * DISPLAY FUNCTIONS
 *
 **************************************************************************/

/**************************************************
 * updateStatus: updates the player's status
 **************************************************/

function updateStatus() {

    soundTrigger();
    //store the image in a variable to prevent removal on refresh
    var img = $(".status_img").clone();
    //clear the status box to prepare to render new status info
    var status = $("#status");
    status.html("");
    //re-insert image
    status.append(img);
    shakeStatusImg();
    status.append("<p>Player Name: " + player.name + "</p>");
    status.append("<p>State: " + player.state + "</p>");
    status.append("<p>Health: " + player.health + "</p>");
    status.append("<p>Happiness: " + player.happiness + "</p>");
    status.append("<p>Turn: " + turn + "</p>");

}

/****************************************************
 * clearOutput: clears the output screen
 ***************************************************/
function clearOutput() {
    //reset output_text
    output_text.html(" ");
    output_prompt.html(" ");
    input_container.html(" ");
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
        var header_text = '';

        if(person.name === 'GAME') {
            header_text = activity.name;
        } else {
            header_text = activity.name + " with " + person.name;
        }
        input_container.append(
            "<div class='encounter-choice span3 hero-unit' >"
            + '<img class="activity-img pull-right" src="'+IMAGE_DIR+'beverage.png">'
            + "<h1>" + activity.name + " (" + person.connection + ") </h1>"
            + "<p class='choice-description'>" + activity.first_description +"</p>"
            + "<button class='btn btn-primary choice-button btn-large' choice-num='" + i + "'>"+ activity.description+"</button>"
            + "<!-- end span3 >"
        );
    }

    $(".choice-button").click(function () {
        clearOutput();
        //var choice = drawCard(choices, 1)[0]; // choose random card (to play game automatically)
        var choice_num = $(this).attr('choice-num');
        var choice = choices[choice_num];       // get array id of choice
        // note: choices are an array: ['activity_id', Person]
        console.log('chosen activity.id: ' + choice[0].id);
        console.log('chosen person.name: ' + choice[1].name);
        evaluateEncounterChoice(choice[0], choice[1]);      // evaluates encounter
    });
}


/**
 * TODO: duplicates display encounter choices. this is not entirely clear how to do.
 * @param {object} minigame - an activity object that's a minigame
 */

function displayMinigameChoices(minigame) {
    var choices = minigame.choices;
    var choices_html ='<ul class="minigame-choices">';
    for (var i=1; i < choices.length; i++) {
        choices_html += '<li class="minigame-choice">' +
        '<a href="#" id="minigame-choice-'+ i + '" choice-data="'+ i +'>'+choices[i]+'</a></li>';
    }
    choices_html += '</ul>';

    $('.minigameChoice').click(function(){
        minigame.run()
    });

    output_text += choices_html;
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
    return stages[Math.floor(turn/TURNS_PER_STAGE)];
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
    var drawn_cards = [];
    array = shuffle(array);
    for (var i=0;i<array.length;i++) {
        if (drawn_cards.length < amt) {
            var card = array[i];
            // remove duplicate cards
            for (var j =0; j < drawn_cards.length; j++) {
                if (JSON.stringify(card) === JSON.stringify(drawn_cards[j])) {
                    drawn_cards.splice(j,1);
                }
            }
            // add chosen card
            drawn_cards.push(card);
        }
    }
    return drawn_cards;
}

// GAME SETTINGS
var CURRENT_STAGE = 0;          // currently a fixed amount
var CONNECTION_INCREMENT = 2;   // currently a fixed amount
var TURNS_PER_STAGE = 4;        // currently a fixed amount
var AMT_CHOICES = 3;            // currently a fixed amount, may depend on happiness later
var turn = 0;                   // turn count for player starts at 0
var IMAGE_DIR = '/choices_choices/templates/img/'; //use this instead of a string
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
    var person_choices = [];
    var stage_activities = stages[CURRENT_STAGE.id].activities;
    if(stage_activities.length > 0) {
        person = search(person_deck, 'name', 'GAME');
        activity = search(activity_deck, 'id', stage_activities.shift());
        // if there are stage activities first, play them one at a time
        console.log('game choices displayed: ' + [[activity, person]]);
        return [[activity, person]];
    } else {
        // 2. weights all persons according to preexisting connection
        for (i = 0; i < person_deck.length; i++) {
            var person = person_deck[i];
            if (person.activities[CURRENT_STAGE.id] && (person.stage === CURRENT_STAGE.id || person.connection >= 1)) {
                for (var k = 0; k <= person.connection; k++) {
                    person_choices.push(person);
                }
            }
        }
    }
    // 3. selects x persons from weighted array
    var chosen_persons = drawCard(person_choices, amt);
    var encounter_choices = [];
    // 4. creates a choice array of the selected persons and the actions that can be performed with them (ex: ['hiking', Person]
    for (var i = 0; i < chosen_persons.length; i++) {
        var chosen_person = chosen_persons[i];
        for (var j = 0; j < chosen_person.activities[CURRENT_STAGE.id].length; j++) {
            // 5. chooses a person action/combo from this array (encounters)
            var activity_id = chosen_person.activities[CURRENT_STAGE.id][j];
            var activity = search(activity_deck,'id',activity_id);
            encounter_choices.push([activity,chosen_person]);
        }
    }
    return drawCard(encounter_choices, amt);
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
        output_text.append("you win!");
    } else if (player.health <= 0) {
        player.state = "dead";
        output_text.append("you died!");
    } else if (!getCurrentStage()) {
        player.state = "dead";
        output_text.append("You died of old age!");
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
    var activity_output = window[activity.id](person);
    output_text.append("<p>" + activity_output + "</p>");

    //increase connection to cards
    person.connection += CONNECTION_INCREMENT;
    activity.connection += CONNECTION_INCREMENT;
    console.log(person.name + ' Connection: ' + person.connection);
    console.log(activity.name + ' Connection: ' + activity.connection);


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
    var player_deck = getChoices(AMT_CHOICES);
    turn += 1;
    $("#input-container").html("");
    // display choices
    updateStatus();
    displayEncounterChoices(player_deck);
}

/************************************************
 * initiates the game app
 ***********************************************/
output_prompt.html('<p>You have just been born into the world. Choose from the options life gives you below.</p>' +
    '<p>You should be aware that the choices you make will affect the outcome of your life and, potentially, the' +
    'choices and connections you will make later.</p>' +
    '<p>Your goal is to have the highest happiness possible before you die.</p>'+
    '<p>Good luck!</p>');

renderGame();