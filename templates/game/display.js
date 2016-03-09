/**
 * Created by Nathan on 3/7/2016.
 */

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
 * @param {[]} activity - activity you can do with these people
 * @param {[]} persons - takes a list of people
 ***************************************************/
function displayActivityChoices(activity, persons) {
    for (var i = 0; i < choices.length; i++) {
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
        evaluateActivityChoice(choice[0], choice[1]);      // evaluates encounter
        console.log('chose: ' + choice[0].id + '/' + choice[1].id);
    });
}