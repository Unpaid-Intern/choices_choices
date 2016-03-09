/**
 * Created by Nathan on 3/7/2016.
 */

// GAME SETTINGS
var CURRENT_STAGE = 0;          // currently a fixed amount
var CONNECTION_INCREMENT = 1;   // currently a fixed amount
var TURNS_PER_STAGE = 10;        // currently a fixed amount
var _Turn = 0;                   // turn count for player starts at 0
var IMAGE_DIR = 'templates/img/'; //use this instead of a string
var INTRO_TEXT = '<p>You have just been born into the world. Choose from the options life gives you below.</p>' +
    '<p>You should be aware that the choices you make will affect the outcome of your life and, potentially, the' +
    'choices and connections you will make later.</p>' +
    '<p>Your goal is to have the highest happiness possible before you die.</p>'+
    '<p>Good luck!</p>';