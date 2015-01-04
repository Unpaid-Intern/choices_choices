
    var player = {
        name: "Nathan",
        state: "alive",
        health: 20,
        happiness: 10,
        days_alone: 0,
        turn: 0
    };

    var daytime_array = ["Day", "Night"];

    var daytime = daytime_array[0];

    var output_text = $("#output-text");
    var output_prompt = $("#output-prompt");


    function updateStatus() {
        //temporarily store the image element in a variable
        var img = $("#status .status_img").clone();
        //clear out status box
        $("#status").html("");
        //put the image back in the status box
        $("#status").append(img);
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
        //make a copy of the array so as not to change it
        var new_array = shuffle(array);
        var card_array = array.slice(array.length - amt, array.length);
        return card_array;
    }

    function createPerson(person) {
        var new_card = card
    }

    function getChoices(amt) {
        var all_choices = [];
        for (i = 0; i < person_deck.length; i++) {
            person = person_deck[i];
            for (j = 0; j < person.activities.length; j++) {
                var choice = [];
                choice.push(person);
                choice.push(person.activities[j]);
                for (k = 0; k < person.connection; k++) {
                    all_choices.push(choice);
                }
            }
        }
        shuffle(all_choices);
        choices = drawCard(all_choices, amt);

        for (i = 0; i < choices.length; i++) {
        }
        return choices;
    }


    function displayChoices(array) {

        //reset output_text


        var choices = array;

        for (i = 0; i < choices.length; i++) {
            var person = choices[i][0].firstName;
            var activity = choices[i][1];
            var choice_num = i + 1;


            $("#input-container").append(
                "<div class='span3' >"
                    //+ "choice " + choice_num + ": "
                + "<h2 class='page-header'>" + activity + " with " + person + ".</h1>"
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

            evaluateChoice(choice, choice[0]);

        });


    }

    function evaluateChoice(choice, chosen_person) {
        //reset output_text
        output_text.html(" ");
        output_prompt.html(" ");


        $("#output-text").append("You chose " + choice[1] + " with " + chosen_person.firstName + ".");

        //increase connection to card
        chosen_person.connection += 1;


        $("#output-text").append("<p>your connection with " + chosen_person.firstName
        + " is now " + chosen_person.connection + "</p>");
        //decrease connection to other cards

        // call activity(person)
        var w = window[choice[1]](chosen_person);


        $("#output-text").append("<p>" + w + "</p>");

        evaluateGameState();

    }

//console.log(deck);
//var example_person = deck[Math.floor(Math.random()*deck.length)];

//console.log(example_person);


// game loop

    function renderGame() {
        amt_choices = 4;
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