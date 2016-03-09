/**
 * Created by Nathan on 3/6/2016.
 */

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
_Attributes = [];
function Attribute(id, name, type, description, connection) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.connection = connection;

    _Attributes.push(this);
}

new Attribute('rickets','Rickets','disease','Rickets makes it hard to walk.',0);


