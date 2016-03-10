/**
 * Created by Nathan on 3/6/2016.
 */

var _Statuses = [];

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

