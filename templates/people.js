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
 * @constructor
 * **************************************************************************** */

 function Stage(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.activities = [];
}
var stages = [];

stages.push(new Stage(0, 'Infancy', 'The first 4 years of life are sometimes the most influential in determining habits and patterns.'));
stages.push(new Stage(1, 'Childhood', 'You could be president.'));
stages.push(new Stage(2, 'Teen years', 'You have so much potential!'));
stages.push(new Stage(3, 'Young Adulthood', 'You have the whole world ahead of you.'));
stages.push(new Stage(4, 'Adulthood', 'You are an adult now.'));
stages.push(new Stage(5, 'Old Age', 'They say life begins at 50.'));

/*************************************************************************************
 * GOALS
 * This feature is not implemented at all. Ideally folks should be able to choose.
 * Currently the goal is hardwired into the game loop (bad).
 * TODO: goals should be chosen at the start of the game and define end conditions.
 * **************************************************************************** */

function Goal(id, name, description, stat, stat_measure) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.stat = stat;
    this.stat_measure = stat_measure;
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
 * @param {string} name
 * @param {string}  full_name
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

function Person(id, name, full_name, gender, met, activities, connection, happiness, state, identity, stage) {
    this.id = id;                 // string used for searching
    this.name = name;               // generally used
    this.full_name = full_name;     // for special occasions (driver's license, etc.)
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

var person_deck = [];

person_deck.push(new Person('game', 'GAME', 'GAME', 'GAME', 'GAME', {
    0:['first_tooth'],
    1:[],
    2:[],
    3:[],
    4:[],
    5:[]
    },
    10, 10, 'parents', 'enemy',  0));


// stage 0 - infant
person_deck.push(new Person('monster','Monster Under the Bed', '', 'm', 'long after midnight', {0:['monster_dance'], 1:['kill'], 2:['kill'], 3:['kill'], 4:['kill'], 5:['kill']}, 10, 10, 'enemy',  'enemy', 0));
person_deck.push(new Person('parents','Mom and Dad', '', 'pl', 'they made you', {0:['baby_talk', 'baby_feeding']}, 10, 10, 'parents','parents',0));
person_deck.push(new Person('uncle', 'Uncle Steve', '', 'm', 'family', {0:['babysitting']}, 10, 10, 'parents', 'enemy',  0));
person_deck.push(new Person('neighbor','Sally Fredricks', 'f', '', 'neighbor', {0:['babysitting']}, 10, 10, 'parents', 'enemy',  0));

// stage 1 - kid
person_deck.push(new Person('a','Aanie', 'Bobbins', 'f', 'the bar', {1:['smoking', 'partying'], 2:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 1 ));
person_deck.push(new Person('b','Banie', 'Bobbins', 'f', 'the bar', {1:['drinking', 'partying'], 2:['drinking', 'dating']}, 10, 10, 'friend',  'friend', 1));
person_deck.push(new Person('c','Canie', 'Bobbins', 'f', 'the bar', {1:['drinking', 'partying'], 2:['dating', 'partying']}, 10, 10, 'friend',  'friend', 1));


// stage 2 - teenage
person_deck.push(new Person('d','Danie', 'Bobbins', 'f', 'the bar', {2:['dating', 'partying'], 3:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 2));
person_deck.push(new Person('e','Eanie', 'Bobbins', 'f', 'the bar', {2:['drinking', 'partying'], 3:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 2));
person_deck.push(new Person('f','Fanie', 'Bobbins', 'f', 'the bar', {2:['drinking', 'partying'], 3:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 2));

// stage 3 - young adult
person_deck.push(new Person('coworker','Patty', 'Hearst', 'f', 'the office', {3:['drinking', 'partying'], 4:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 3));
person_deck.push(new Person('h','Hanie', 'Bobbins', 'f', 'the bar', {2:['drinking', 'partying'], 3:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 3));
person_deck.push(new Person('i','Ianie', 'Bobbins', 'f', 'the bar', {2:['drinking', 'partying'], 3:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 3));

// stage 4 - adult
person_deck.push(new Person('j','Janie', 'Bobbins', 'f', 'the bar', {2:['drinking', 'partying'], 4:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 4));
person_deck.push(new Person('k','Kanie', 'Bobbins', 'f', 'the bar', {2:['drinking', 'partying'], 4:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 4));
person_deck.push(new Person('l','Lanie', 'Bobbins', 'f', 'the bar', {2:['drinking', 'partying'], 4:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 4));

// stage 5 - retirement
person_deck.push(new Person('m','Manie', 'Bobbins', 'f', 'the bar', {2:['drinking', 'partying'], 5:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 5));
person_deck.push(new Person('n','Nanie', 'Bobbins', 'f', 'the bar', {2:['drinking', 'partying'], 5:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 5));
person_deck.push(new Person('o','Oanie', 'Bobbins', 'f', 'the bar', {2:['drinking', 'partying'], 5:['drinking', 'partying']}, 10, 10, 'friend',  'friend', 5));

person_deck.push(new Person('hobo','Hobo Pete', 'xxx', 'm', 'the street', {2:['buy_drugs'], 3:['buy_drugs'], 4:['buy_drugs']}, 10, 10, 'friend',  'friend', 5));
person_deck.push(new Person('church_peer','Dana', 'Wallace', 'f', 'the bar', {3:['church'], 4:['sex', 'church'],  5:['sex', 'church']}, 10, 10, 'friend',  'friend', 5));