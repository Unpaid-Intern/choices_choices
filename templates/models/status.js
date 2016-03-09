/**
 * Created by Nathan on 3/6/2016.
 */

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
