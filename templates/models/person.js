/**
 * Created by Nathan on 3/6/2016.
 */



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
        case 'm':
            return 's';
        case 'f':
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
