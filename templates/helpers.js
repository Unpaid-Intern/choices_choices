/*******************************************************************
 * UTILITY FUNCTIONS
 ************************************************************************************ */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * returns the name of the function that called it.
 * @returns {Function}
 */
function getFunctionName() {
    return arguments.callee.caller;
}