/*************************************************************************************
 * This contains most of the database structure of the game. Most of the minigame logic is stored
 * in helpers.js.
 * 2/13/16 - this may no longer be true -nlivni
 * ***********************************************************************************/

var _ShakeTrigger;
var _HealthChange;

var _Stages = [];
var _Activities = []; // _Activities holds all Activity objects
var _Statuses = [];
var _Diseases = [];
var _Addictions = [];
var _Persons = [];

/**************************************************************************************
 * STAGES
 * stages represent the stages of life that a player potentially goes through.
 * @param id
 * @param name
 * @param description
 * @param activities
 * @param prompts
 * @constructor
 * **************************************************************************** */
 function Stage(id, name, description, activities, prompts) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.activities = activities;
    this.prompts = prompts;
    _Stages.push(this);
}

new Stage(0, 'Infancy', 'The first 4 years of life are sometimes the most influential in determining habits and patterns.',[], []);
new Stage(1, 'Childhood', 'You could be president.',[], []);
new Stage(2, 'Teen years', 'You have so much potential!',[], []);
new Stage(3, 'Young Adulthood', 'You have the whole world ahead of you.',[], []);
new Stage(4, 'Adulthood', 'You are an adult now.',[], []);
new Stage(5, 'Old Age', 'They say life begins at 50.',[], []);

/*****************************************************************************
 * STATUS
 * each person has a socioeconomic class called status
 * @param {number} id
 * @param {string} name
 * @param {string} description
 * @constructor
************************************************************************************ */

function Status(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    _Statuses.push(this);
}

new Status(0, 'Rich', 'Above 200k/yr');
new Status(1, 'Middle Class', '30k-200k/yr');
new Status(2, 'Poor', 'Less than 30k/yr');

/*****************************************************************************
 * DISEASES
 * Player attributes could be deseases or other status adornments. They could call a function of
 * the same name.
 * @param {string} id
 * @param {string} name
 * @param  {string} description
 * @constructor
 * TODO: Attributes need to be linked to the player's stats
 ************************************************************************************ */
function Disease(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;

    _Diseases.push(this);
}

/*****************************************************************************
 * ADDICTIONS
 * Player attributes could be deseases or other status adornments. They could call a function of
 * the same name.
 * @param {string} id
 * @param {string} name
 * @param  {string} description
 * @constructor
 * TODO: Attributes need to be linked to the player's stats
 ************************************************************************************ */
function Addiction(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;

    _Addictions.push(this);
}

/****************************************************************
 * PERSONS
 * Persons define activities that we can engage in.
 * GAME is a special person which acts as a kind of npc to have personless interactions.
 *
 * @param {string} id
 * @param {string} name
 * @param {string} firstDisplayName
 * @param {string} state
 * @param {string} stateDescription
 * @param {number} stage

 * @param {string} gender
 * @param {Object} activities
 * @param {number} connection
 * @param {number} happiness
 *
 * @param {number} health
 * @param {number} money
 * @param {object} inventory
 * @param {string} transportation
 * @param {string} relationshipStatus
 * @param {object} diseases
 * @param {object} addictions
 * @param {object} obituary
 * @param {string} causeOfDeath
 * @param {object} personDeck
 * @constructor
 *
 *
 *****************************************************************/
function Person(id, name, firstDisplayName, gender, activities, connection, happiness, state,
                stateDescription, stage, health, money, inventory, transportation, diseases,
                relationshipStatus, addictions, obituary, causeOfDeath, personDeck) {
    this.id = id;                 // string used for searching
    this.name = name;               // generally used
    this.firstDisplayName = firstDisplayName;     // for special occasions (driver's license, etc.)
    this.gender = gender;           //
    this.strength = strength;   //
    this.dexterity = dexterity;   //
    this.intelligence = intelligence;   //
    this.wisdom = wisdom;   //
    this.comliness = comliness;   //
    this.happiness = happiness;     // happiness is currently how you win the game
    this.activities = activities;   // all the activity functions by stage. {0:['act1', 'act2'],1:['act1', 'act2']}
    this.state = state;             //
    this.stateDescription = stateDescription;       //
    this.stage = stage;             // stage at which character can be drawn
    this.inventory = [];
    this.personDeck =[];


    // ATTRIBUTES
    this.health = health; // player dies when it reaches 0
    this.happiness = happiness;      // player loses or gains options when it increases/decreases
    this.money = 0;
    this.transportation = "walking";
    //this.diseases = [{'chickenPox':1},{'rickets':0}];
    //this.addictions = [];
    this.relationshipStatus = 'single';
    this.obituary = [[],[],[],[],[],[]];
    this.causeOfDeath = 'Unknown';

    _Persons.push(this);
    for (var i=0; i < _Stages.length; i++) {
        if (activities[i]) {
            this.activities[i]= activities[i];
        } else {
            this.activities[i] = [];
        }
    }
    player.personDeck.push(this);

}

Person.prototype.subjective = function() {
    switch (this.gender) {
        case 'm':
            return 'he';
        case 'f':
            return 'she';
        case 'pl':
            return 'it';
    }
};
Person.prototype.objective = function() {
    switch (this.gender) {
        case 'm':
            return 'him';
        case 'f':
            return 'her';
        case 'pl':
            return 'it';
    }
};
Person.prototype.possessive = function() {
    switch(this.gender) {
        case 'm':
            return 'his';
        case 'f':
            return 'hers';
        case 'pl':
            return 'its';
    }
};
Person.prototype.plural = function() {
    switch(this.gender) {
        case 'm':
            return 's';
        case 'f':
            return 's';
        case 'pl':
            return '';
    }
};

Person.prototype.updateObituary = function(updateText) {
    this.obituary[getCurrentStage().id].push(updateText);
    console.log(player.obituary[getCurrentStage().id]);
};

Person.prototype.updateHealth = function(number) {

//if the number by which update health is being adjusted is negative, then set _ShakeTrigger to true, so
//that the correct sounds, and animations will be played.
    if( number < 0) {
        _ShakeTrigger = true;
    }
    else
    {
        _ShakeTrigger = false;
    }

    _HealthChange = number;
    console.log("health:" + number);
    animateDamageText();
    this.health += number;
    $playerHealth.text(player.health);
    $outputResults.append('<p>Health: ' + getSignedNumber(number) + '</p>');
};

Person.prototype.updateHappiness = function(number) {
    _HealthChange = 0;
    this.happiness += number;
    $playerHappiness.text(player.happiness);
    $outputResults.append('<p>Happiness: ' + getSignedNumber(number) + '</p>');
};

Person.prototype.addInventory = function(item) {
    this.inventory.splice(item);
};

Person.prototype.removeInventory = function(item) {
    this.inventory.push(item);
};

Person.prototype.addAttribute = function(attr) {
    this.inventory.push(attr);
};

Person.prototype.removeAttribute = function(attr) {
    this.inventory.splice(attr);
};

Person.prototype.addActivity = function(stage, activityId) {
    this.activities[stage].push(activityId);
};

/**
 *  ACTIVITY
 * @param {number} id
 * @param {string} name
 * @param {string} firstDescription
 * @param {string} description
 * @param {string} connection
 * @param {number} stageNumber
 * @constructor
 */

function Activity(id, name, firstDescription, description, connection, stageNumber) {
    this.id = id;
    this.name = name;
    this.firstDescription = firstDescription;
    this.description = description;
    this.connection = connection;
    this.stageNumber = stageNumber;

    // adds function this.id as .run method
    if (window[this.id]) {
        this.run = window[this.id];
    } else {
        // returns error to console if matching function not found
        console.log("ERROR -- No function named " + id);
    }

    //console.log('id: '+ id + ' -- stageNumber: ' + stageNumber);

    if(stageNumber !== false) {
        //console.log(id + ' pushing to Stage ' + stageNumber);
        _Stages[stageNumber].activities.push(id);
    }
    _Activities.push(this);
}

