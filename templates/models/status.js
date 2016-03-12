/**
 * Created by Nathan on 3/6/2016.
 */

var _socialStatuses = [];

/*****************************************************************************
 * STATUS
 * each person has a socioeconomic class called status
 * @param {number} id
 * @param {string} name
 * @param {string} description
 * @constructor
 ************************************************************************************ */

function socialStatus(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    _socialStatuses.push(this);
}

