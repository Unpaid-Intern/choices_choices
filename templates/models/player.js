/**
 * Created by Nathan on 3/6/2016.
 */


var player = {
    name: "Nathan",
    state: "alive",
    gender: 'm',
    health: 15,         // player dies when it reaches 0
    happiness: 10,      // player loses or gains options when it increases/decreases
    money: 0,
    inventory: [],
    transportation: "walking",
    attachment: 0,
    diseases: [],
    attributes: ['single'],
    addictions: [],
    obituary: {0:[], 1:[],2:[],3:[],4:[],5:[]},
    causeOfDeath: 'Unknown',
    personDeck:[]
};

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
 * transportation: Array,
 * attachment: number,
 * diseases: Array,
 * attributes: string[],
 * addictions: Array,
 * obituary: { 0: Array, 1: Array, 2: Array, 3: Array, 4: Array, 5: Array},
 * causeOfDeath: string,
 * personDeck: Array}}
 */



function Player(
    id,
    gender,
    title,
    firstName,
    lastName,
    city,
    state,
    zip,
    dob,
    phone,
    cell,
    DNI,
    picture_portrait,
    picture_icon,
    picture_pix_portrait,
    picture_pix_icon,
    nationality) {
    id=id;
    gender =gender;
    title = title;
    firstName = firstName;
    lastName;
    city;
    state;
    zip;
    dob;
    phone;
    cell;
    DNI;
    picture_portrait;
    picture_icon;
    picture_pix_portrait;
    picture_pix_icon;
    nationality
}



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
