
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Person(first, last, met, activities, connection, happiness, state) {
    this.firstName = first;
    this.lastName = last;
    this.met = met;
    this.activities = activities;
    this.connection = connection;
    this.happiness = happiness;
    this.state = state;
}

var p1 = {
    firstName:"Pete",
    lastName:"Doe",
    met: "high school",
    happiness:50,
    connection:1,
    activities:["drinking", "partying"]
};

var p2 = {
    firstName:"Jane",
    lastName:"Doe",
    happiness: getRandomInt(1,20),// not updated, needs method for that
    connection:1,
    activities:["drinking", "partying", "sex"]
};
var person_deck = [];
person_deck.push(p1);
person_deck.push(p2);
