// the player stores basic variables about the player's character.
var player = {
    name: "Nathan",
    state: "alive",
    health: 20,         // player dies when it reaches 0
    happiness: 10,      // player loses or gains options when it increases/decreases
    inventory: [],
    attributes: []
};

// DISPLAY SETTINGS
var output_text = $("#output-text");
var output_prompt = $("#output-prompt");
var input_container = $("#input-container");

// DISPLAY FUNCTIONS

// updates the player's status
function updateStatus() {

    //store the image in a variable to prevent removal on refresh
    var img = $(".status_img").clone();
    //clear the status box to prepare to render new status info
    $("#status").html("");
    //re-insert image
    $("#status").append(img);
    $("#status").append("<p>Player Name: " + player.name + "</p>");
    $("#status").append("<p>State: " + player.state + "</p>");
    $("#status").append("<p>Health: " + player.health + "</p>");
    $("#status").append("<p>Happiness: " + player.happiness + "</p>");
    $("#status").append("<p>Turn: " + turn + "</p>");
}

// clears the output screen
function clearOutput() {
    //reset output_text
    output_text.html(" ");
    output_prompt.html(" ");
    input_container.html(" ");
}

// should do what it says. this is very rough these days
function displayChoices(array) {
    var choices = array;

    for (i = 0; i < choices.length; i++) {
        var person = choices[i][1];
        var activity = choices[i][0];
        var choice_num = i + 1;

        input_container.append(
            "<div class='span3' >"
                //+ "choice " + choice_num + ": "
            + "<h5 class='page-header'>" + activity + " with " + person.name + ".</h5>"
            + "<p class='choice-description'> Connection:" + person.connection + "</p>"
            + "<button class='btn btn-primary choice-button btn-large' choice-num='" + i + "'>OK</button>"
            + '<img class="activity_img" src="templates/img/beverage.png">'
            + "<!-- end span3 >"
        );
    }

    $(".choice-button").click(function () {
        clearOutput();
        //var choice = drawCard(choices, 1)[0]; // choose random card (to play game automatically)
        var choice_num = $(this).attr('choice-num');
        var choice = choices[choice_num];       // get array id of choice
        // note: choices are an array: ['activity_id', Person]

        evaluateChoice(choice, choice[1]);      // evaluates encounter

    });
}

// GAME HELPER FUNCTIONS

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

// returns the current stage (currently set to calculate on fixed turns/stage)
function getCurrentStage() {
    return stages[Math.floor(turn/TURNS_PER_STAGE)];
}

// returns a randomly shuffled array
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

// shuffles an array with duplicates and returns an array unique ones with length specified
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

var TURNS_PER_STAGE = 4;    // currently a fixed amount
var AMT_CHOICES = 3;        // currently a fixed amount, may depend on happiness later
var turn = 0;                // turn count for player starts at 0

// GAME FUNCTIONS

// getChoices given x choices returns x allowable encounters
//  @todo: currently people can be duplicated with different actions, both actions and people should be unique in each deck.
function getChoices(amt) {
    // 1. creates array of person choices based on
    // - they have instructions for the current stage AND
    // - they're assigned to this stage OR they have a preexisting connection
    var person_choices = [];
    var current_stage = getCurrentStage();
    // 2. weights all persons according to preexisting connection
    for (i = 0; i < person_deck.length; i++) {
        var person = person_deck[i];
        if (person.activities[current_stage.id] && (person.stage === current_stage.id || person.connection >= 1)) {
            for (var j = 0; j <= person.connection; j++) {
                person_choices.push(person);
            }
        }
    }
    // 3. selects x persons from weighted array
    var chosen_persons = drawCard(person_choices, amt);
    var encounter_choices = [];
    // 4. creates a choice array of the selected persons and the actions that can be performed with them (ex: ['hiking', Person]
    for (var i = 0; i < chosen_persons.length; i++) {
        var chosen_person = chosen_persons[i];
        for (var j = 0; j < chosen_person.activities[current_stage.id].length; j++) {
            // 5. chooses a person action/combo from this array (encounters)
            var activity = chosen_person.activities[current_stage.id][j];
            encounter_choices.push([activity,chosen_person]);
        }
    }
    // 6. returns an array of encounters
    return drawCard(encounter_choices, amt);
}

// evaluates if the game is over or not
function evaluateGameState() {
    // win condition
    if (player.happiness >= 100) {
        player.state = "won";
        output_text.append("you win!");
        return "victory";
        // death condition
    } else if (player.health <= 0) {
        player.state = "dead";
        output_text.append("you died!");
        return "dead";
        // see if there's any more left to the game
    } else if (!getCurrentStage()) {
        player.state = "dead";
        output_text.append("You died of old age!");
        return "dead";
        // otherwise run game loop again
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


// takes an
function evaluateChoice(choice, chosen_person) {

    clearOutput();
    output_text.append("You chose " + choice[0] + " with " + chosen_person.name + ".");
    //increase connection to card
    chosen_person.connection += 2;
    output_text.append("<p>your connection with " + chosen_person.name
    + " is now " + chosen_person.connection + "</p>");
    // decrease connection to other cards
    // call activity with person as argument: activity(person)
    var activity_output = window[choice[0]](chosen_person);
    output_text.append("<p>" + activity_output + "</p>");
    evaluateGameState();
}

// renderGame is the game loop
function renderGame() {
    var player_deck = getChoices(AMT_CHOICES);
    turn += 1;
    $("#input-container").html("");
    // display choices
    updateStatus();
    output_prompt.html("<p>Choose an encounter.</p>");
    displayChoices(player_deck);
}

// initiates the game app
renderGame();
