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
        $outputResults.append("you died!");
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
function evaluateActivityChoice(activity, person) {
    clearOutput();
    // decrease connection to other cards
    // call activity with person as argument: activity(person)
    var activityOutput = activity.run((person));

    $outputText.typeTo(activityOutput);

    //increase connection to cards
    person.connection += CONNECTION_INCREMENT;
    activity.connection += CONNECTION_INCREMENT;

    evaluateGameState();
}

/************************************************
 * renderGame is the game loop
 ***********************************************/

function renderGame() {
    _Turn += 1;
    if(CURRENT_STAGE !== getCurrentStage()) {       // introduce stage of life;
        CURRENT_STAGE = getCurrentStage();
        stageIntro();
    }
    var stage = _Stages[CURRENT_STAGE.id];          // get the stage
    var activity = getActivity(CURRENT_STAGE.id);   // get the activity

    $("#input-container").html("");                 // reset the input container
    updateStatus();                                 // update player status
    displayActivityChoices(activity);              // display choices based on activity
}

/************************************************
 * initiates the game app
 ***********************************************/

$outputPrompt.html(INTRO_TEXT);
renderGame();