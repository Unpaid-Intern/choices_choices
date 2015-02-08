/*************************************************************************************
 * This contains most of the database structure of the game. Most of the minigame logic is stored
 * in activities.js.
 * ***********************************************************************************/



/*******************************************************************
 * UTILITY FUNCTIONS
 ************************************************************************************ */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var _ShakeTrigger;
var _HealthChange;

/**
 *
 * @type {{name: string,
 * state: string,
 * gender: string,
 * health: number,
 * happiness: number,
 * inventory: Array,
 * attachment: number,
 * diseases: Array,
 * attributes: string[],
 * addictions: Array,
 * obituary: { 0: Array, 1: Array, 2: Array, 3: Array, 4: Array, 5: Array},
 * causeOfDeath: string,
 * personDeck: Array}}
 */
var player = {
    name: "Nathan",
    state: "alive",
    gender: 'm',
    health: 15,         // player dies when it reaches 0
    happiness: 10,      // player loses or gains options when it increases/decreases
    money: 0,
    inventory: [],
    attachment: 0,
    diseases: [],
    attributes: ['single'],
    addictions: [],
    obituary: {0:[], 1:[],2:[],3:[],4:[],5:[]},
    causeOfDeath: 'Unknown',
    personDeck:[]
};

player.subjective = function() {
    switch (this.gender) {
        case 'm':
            return 'he';
        case 'f':
            return 'she';
        case 'pl':
            return 'it';
    }
};

player.objective = function() {
    switch (this.gender) {
        case 'm':
            return 'him';
        case 'f':
            return 'her';
        case 'pl':
            return 'it';
    }
};

player.possessive = function() {
    switch(this.gender) {
        case 'm':
            return 'his';
        case 'f':
            return 'hers';
        case 'pl':
            return 'its';
    }
};

player.plural = function() {
    switch(this.gender) {
        case 'm' || 'f':
            return 's';
        case 'pl':
            return '';
    }
};

player.updateObituary = function(updateText) {
    this.obituary[getCurrentStage().id].push(updateText);
    console.log(player.obituary[getCurrentStage().id]);
};

player.updateHealth = function(number) {

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

player.updateHappiness = function(number) {
    _HealthChange = 0;
    this.happiness += number;
    $playerHappiness.text(player.happiness);
    $outputResults.append('<p>Happiness: ' + getSignedNumber(number) + '</p>');
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
var _Stages = [];

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

var _Statuses = [];
new Status(0, 'Rich', 'Above 200k/yr');
new Status(1, 'Middle Class', '30k-200k/yr');
new Status(2, 'Poor', 'Less than 30k/yr');

/*****************************************************************************
 * ATTRIBUTES
 * Player attributes could be deseases or other status adornments. They could call a function of
 * the same name.
 * @param {string} id
 * @param {string} name
 * @param {string} type
 * @param  {string} description
 * @param  {number} connection
 * @constructor
 * TODO: Attributes need to be linked to the player's stats
 ************************************************************************************ */
_Attributes = [];
function Attribute(id, name, type, description, connection) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.connection = connection;

    _Attributes.push(this);
}

new Attribute('rickets','Rickets','disease','Rickets makes it hard to walk.',0);

/****************************************************************
 * PERSONS
 * Persons define activities that we can engage in.
 * GAME is a special person which acts as a kind of npc to have personless interactions.
 *
 * @param {string} id
 * @param {string} name
 * @param {string} firstDisplayName
 * @param {string}  gender
 * @param {Object} activities
 * @param {number}  connection
 * @param {number} happiness
 * @param {string} state
 * @param {string} stateDescription
 * @param {number} stage
 * @constructor
 *
 *
 *****************************************************************/
_Persons = [];
function Person(id, name, firstDisplayName, gender, activities, connection, happiness, state, stateDescription, stage) {
    this.id = id;                 // string used for searching
    this.name = name;               // generally used
    this.firstDisplayName = firstDisplayName;     // for special occasions (driver's license, etc.)
    this.gender = gender;           // for pronouns: options are 'm', 'f' and 'pl'
    this.activities = activities;   // all the activity functions by stage
    this.connection = connection;   // increments as player interacts more
    this.happiness = happiness;     // happiness is currently how you win the game
    this.state = state;             //
    this.stateDescription = stateDescription;       //
    this.stage = stage;             // stage at which character can be drawn

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
        case 'm' || 'f':
            return 's';
        case 'pl':
            return '';
    }
};

Person.prototype.addActivity = function(stage, activityId) {
    this.activities[stage].push(activityId);
};

function getPerson(personId) {
    return search(player.personDeck, 'id', personId);
}

function removePerson(person) {
    player.personDeck.filter(function (el) {return el.id !== person.id;});
}

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

var _Activities = []; // _Activities holds all Activity objects

function getActivity(activityId) {
    return search(_Activities, 'id', activityId);
}

/**
 * returns the name of the function that called it.
 * @returns {Function}
 */
function getFunctionName() {
    return arguments.callee.caller;
}


/**
 * cycles through an Person's stages, removing the activity entirely from that person
 * @param activityId
 * @param person
 */

function removeActivityFromPerson(activityId, person) {
    for(var i=0; i < _Stages.length; i++) {
        var index = person.activities[i].indexOf(activityId);
        if (index >= -1) {
            person.activities[i].splice(index);
        }
    }
}
