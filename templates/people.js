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
var _stages = [];
 function Stage(id, name, description, activities, prompts) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.activities = activities;
    this.prompts = prompts;
}

_stages.push(new Stage(0, 'Infancy', 'The first 4 years of life are sometimes the most influential in determining habits and patterns.',[], []));
_stages.push(new Stage(1, 'Childhood', 'You could be president.',[], []));
_stages.push(new Stage(2, 'Teen years', 'You have so much potential!',[], []));
_stages.push(new Stage(3, 'Young Adulthood', 'You have the whole world ahead of you.',[], []));
_stages.push(new Stage(4, 'Adulthood', 'You are an adult now.',[], []));
_stages.push(new Stage(5, 'Old Age', 'They say life begins at 50.',[], []));

/*************************************************************************************
 * GOALS
 * This feature is not implemented at all. Ideally folks should be able to choose.
 * Currently the goal is hardwired into the game loop (bad).
 * TODO: goals should be chosen at the start of the game and define end conditions.
 * **************************************************************************** */

function Goal(id, name, description, stat, statMeasure) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.stat = stat;
    this.statMeasure = statMeasure;
}

var goals = [];
goals.push(new Goal(0, 'Go to France', 'See the world', 'money', 1000));

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
}

var statuses = [];
statuses.push(new Status(0, 'Rich', 'Above 200k/yr'));
statuses.push(new Status(1, 'Middle Class', '30k-200k/yr'));
statuses.push(new Status(2, 'Poor', 'Less than 30k/yr'));

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

function Attribute(id, name, type, description, connection) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.connection = connection;
}
attributes = [];

attributes.push(new Attribute('rickets','Rickets','disease','Rickets makes it hard to walk.',0));

/****************************************************************
 * PERSONS
 * Persons define activities that we can engage in.
 * GAME is a special person which acts as a kind of npc to have personless interactions.
 *
 * @param {string} id
 * @param {string} name
 * @param {string}  fullName
 * @param {string}  gender
 * @param {string}  met
 * @param {Object} activities - all the activity functions by stage
 * @param {number}  connection
 * @param {number} happiness
 * @param {string} state
 * @param {string} identity
 * @param {number} stage
 * @constructor
 *
 *
 *****************************************************************/

function Person(id, name, fullName, gender, met, activities, connection, happiness, state, identity, stage) {
    this.id = id;                 // string used for searching
    this.name = name;               // generally used
    this.fullName = fullName;     // for special occasions (driver's license, etc.)
    this.gender = gender;           // for pronouns: options are 'm', 'f' and 'pl'
    this.met = met;                 // how this character came into the player's life
    this.activities = activities;   // used to
    this.connection = connection;   //
    this.happiness = happiness;     //
    this.state = state;             //
    this.identity = identity;       //
    this.stage = stage;             // stage at which character can be drawn
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

var personDeck = [];

/**
 *
 * @param {string} id
 * @param {string} name
 * @param {string} fullName
 * @param {string} gender
 * @param {string} met
 * @param {object} activities
 * @param {number} connection
 * @param {number} happiness
 * @param {string} state
 * @param {string} identity
 * @param {number} stage
 * @returns {Person}
 */

function createPerson(id, name, fullName, gender, met, activities, connection, happiness, state, identity, stage) {
    var newPerson = new Person(id, name, fullName, gender, met, {}, connection, happiness, state, identity, stage);
    for (var i=0; i < _stages.length; i++) {
        if (activities[i]) {
            newPerson.activities[i]= activities[i];
        } else {
            newPerson.activities[i] = [];
        }
    }
    personDeck.push(newPerson);
    return newPerson;
}

function getPerson(personId) {
    return search(personDeck, 'id', personId);
}

function removePerson(person) {
    personDeck.filter(function (el) {return el.id !== person.id;});
}



function Activity(id, name, firstDescription, description, connection) {
    this.id = id;
    this.name = name;
    this.firstDescription = firstDescription;
    this.description = description;
    this.connection = connection;
}

var activityDeck = []; // activityDeck holds all Activity objects

function createActivity(id, name, firstDescription, description, connection, stageNumber) {
    var newActivity = activityDeck.push(id, name, firstDescription, description, connection);
    activityDeck.push(newActivity);
    if(isNaN(stageNumber) === false) {
        _stages[stageNumber].activities.push(newActivity.id);
    }
    return(newActivity);
}

function getActivity(activityId) {
    return search(activityDeck, 'id', activityId);
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
    for(var i=0; i < _stages.length; i++) {
        var index = person.activities[i].indexOf(activityId);
        if (index >= -1) {
            person.activities[i].splice(index);
        }
    }
}
