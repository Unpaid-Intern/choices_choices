/**
 * Created by Nathan on 3/6/2016.
 */

var _Activities = []; // _Activities holds all Activity objects

function Activity(id, name, firstDescription, description, connection, stageNumber) {
    this.id = id;
    this.name = name;
    this.firstDescription = firstDescription;
    this.description = description;
    this.connection = connection;
    this.stageNumber = stageNumber;

    // adds function this.id as .run method if there's a matching function
    if (window[this.id]) {
        this.run = window[this.id];
    } else {
        console.log("ERROR -- No function named " + id);
    }

    //console.log('id: '+ id + ' -- stageNumber: ' + stageNumber);

    if(stageNumber !== false) {
        //console.log(id + ' pushing to Stage ' + stageNumber);
        _Stages[stageNumber].activities.push(id);
    }
    _Activities.push(this);
}

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
