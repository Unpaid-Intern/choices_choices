function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// database - this includes all the static elements of the game

// stages represent the stages of life that a player potentially goes through.
function Stage(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
}
var stages = [];

stages.push(new Stage(0, 'Infancy', 'The first 4 years of life are sometimes the most influential in determining habits and patterns.'));
stages.push(new Stage(1, 'Childhood', 'You could be president.'));
stages.push(new Stage(2, 'Teen years', 'You have so much potential!'));
stages.push(new Stage(3, 'Young Adulthood', 'You have the whole world ahead of you.'));
stages.push(new Stage(4, 'Adulthood', 'You are an adult now.'));
stages.push(new Stage(5, 'Old Age', 'They say life begins at 50.'));


// each person has a socioeconomic class called status
function Status(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
}

var statuses = [];
statuses.push(new Status(0, 'Rich', 'Above 200k/yr'));
statuses.push(new Status(1, 'Middle Class', '30k-200k/yr'));
statuses.push(new Status(2, 'Poor', 'Less than 30k/yr'));


// activities are defined by the people around us.
function Person(first, last, met, activities, connection, happiness, state, identity, stage) {
    this.firstName = first;
    this.lastName = last;
    this.met = met;
    this.activities = activities;
    this.connection = connection;
    this.happiness = happiness;
    this.state = state;
    this.identity = identity; //
    this.stage = stage; // stage at which character can be drawn
}
var person_deck = [];

// stage 0
person_deck.push(new Person('Monster Under the Bed', '', 'long after midnight', ['monster_dance'], 21, 21, 'enemy', 0));
person_deck.push(new Person('Mom and Dad', '', 'they made you', ['baby_talk', 'baby_feeding'], 21, 21, 'parents', 0));
person_deck.push(new Person('Uncle Steve', '', 'family', ['babysitting'], 21, 21, 'parents', 0));
person_deck.push(new Person('Sally Fredricks', '', 'neighbor', ['babysitting'], 21, 21, 'parents', 0));

// stage 1
person_deck.push(new Person('Lanie', 'Bobbins', 'the bar', ['drinking', 'partying'], 21, 21, 'friend', 0));
person_deck.push(new Person('Lanie', 'Bobbins', 'the bar', ['drinking', 'partying'], 21, 21, 'friend', 0));
person_deck.push(new Person('Lanie', 'Bobbins', 'the bar', ['drinking', 'partying'], 21, 21, 'friend', 0));


// stage 2
person_deck.push(new Person('Lanie', 'Bobbins', 'the bar', ['drinking', 'partying'], 21, 21, 'friend', 0));
person_deck.push(new Person('Lanie', 'Bobbins', 'the bar', ['drinking', 'partying'], 21, 21, 'friend', 0));
person_deck.push(new Person('Lanie', 'Bobbins', 'the bar', ['drinking', 'partying'], 21, 21, 'friend', 0));

// stage 3
person_deck.push(new Person('Lanie', 'Bobbins', 'the bar', ['drinking', 'partying'], 21, 21, 'friend', 0));
person_deck.push(new Person('Fred', 'Bobbins', 'the bar', ['drinking', 'partying'], 21, 21, 'friend', 0));
person_deck.push(new Person('Chris', 'Seegar', 'the bar', ['drinking', 'partying'], 10, 40, 'friend', 0));

// stage 4

// stage 5

var category_deck = [];
function Category(name, description) {

}
