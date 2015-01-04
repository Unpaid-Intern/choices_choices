var output_text = $("#output-text");
var output_prompt = $("#output-prompt");


var player = {
    name: "Nathan",
    state: "alive",
    health: 20,
    happiness: 10,
    days_alone: 0,
    turn: 0
};

function updateStatus() {
    $("#status").html("");
    $("#status").append("<p>Player Name: " + player.name + "</p>");
    $("#status").append("<p>State: " + player.state + "</p>");
    $("#status").append("<p>Health: " + player.health + "</p>");
    $("#status").append("<p>Happiness: " + player.happiness + "</p>");
    $("#status").append("<p>Turn: " + player.turn + "</p>");
}

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

function evaluateGameState() {
    if (player.happiness >= 100) {
        player.state = "won";
        output_text.append("you win!");
        return "victory";

    } else if (player.health <= 0) {
        player.state = "dead";
        output_text.append("you died!");
        return "dead";
    } else if (player.state === "alive") {
        renderGame();
    }
    updateStatus();

}

function drawCard(array, amt) {
    var drawn_cards = [];
    array = shuffle(array);
    for (var i=0;i<array.length;i++) {
        if (drawn_cards.length < amt) {
            var card = array[i];
            for (var j =0; j < drawn_cards.length; j++) {
                if (JSON.stringify(card) === JSON.stringify(drawn_cards[j])) {
                    drawn_cards.splice(j,1);
                }
            }
            drawn_cards.push(card);
        }
    }
    console.log(drawn_cards);
    return drawn_cards;
}

function getChoices(amt) {
    var person_choices = [];
    // choose your people
    for (i = 0; i < person_deck.length; i++) {
        var person = person_deck[i];
        if (person.connection >= 1) {

        }
        if (person.activities[current_stage.id] && (person.stage === current_stage || person.connection >= current_stage)) {
            for (var j = 0; j <= person.connection; j++) {
                person_choices.push(person);
            }
        }
    }
    var chosen_persons = drawCard(person_choices, amt);
    var encounter_choices = [];
    for (var i = 0; i < chosen_persons.length; i++) {
        var chosen_person = chosen_persons[i];
        for (var j = 0; j < chosen_person.activities[current_stage.id].length; j++) {

            var activity = chosen_person.activities[current_stage.id][j];
            encounter_choices.push([activity,chosen_person]);
        }
    }
    return drawCard(encounter_choices, amt);
}


function displayChoices(array) {
    var choices = array;

    for (i = 0; i < choices.length; i++) {
        var person = choices[i][1].firstName;
        var activity = choices[i][0];
        var choice_num = i + 1;

        $("#input-container").append(
            "<div class='span3' >"
                //+ "choice " + choice_num + ": "
            + "<h5 class='page-header'>" + activity + " with " + person + ".</h5>"
            + "<p class='choice-description'>" + "choice description here" + "</p>"
            + "<button class='btn btn-primary choice-button btn-large' choice-num='" + i + "'>OK</button>"
            + "<!-- end span3 >"
        );
    }


    $(".choice-button").click(function () {

        output_text.html(" ");

        //var choice = drawCard(choices, 1)[0]; // choose random card
        var choice_num = $(this).attr('choice-num');

        var choice = choices[choice_num];

        evaluateChoice(choice, choice[1]);

    });


}

function evaluateChoice(choice, chosen_person) {
    //reset output_text
    output_text.html(" ");
    output_prompt.html(" ");


    $("#output-text").append("You chose " + choice[0] + " with " + chosen_person.firstName + ".");

    //increase connection to card
    chosen_person.connection += 1;


    $("#output-text").append("<p>your connection with " + chosen_person.firstName
    + " is now " + chosen_person.connection + "</p>");
    //decrease connection to other cards

    // call activity(person)
    var w = window[choice[0]](chosen_person);


    $("#output-text").append("<p>" + w + "</p>");

    evaluateGameState();

}

// game loop

function renderGame() {
    var amt_choices = 3;
    if (!player_deck) {
        var player_deck = getChoices(amt_choices);
    }
    player.turn += 1;
    $("#input-container").html("");


    // display choices
    updateStatus();
    output_prompt.html("<p>You're wondering what to do tonight.</p>");
    displayChoices(player_deck);
}

function game() {
    renderGame();
}

game();