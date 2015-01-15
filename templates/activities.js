// action names are stored as strings Person objects

function Activity(id, name, description, connection) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.connection = connection;
}
var activity_deck = [];
activity_deck.push(new Activity('monster_dance', 'Monster Dance', 'Dance with a monster', 0));

// monster befriends sad kids and bites happy ones
function monster_dance(person) {
    var output = person.name + " invites you under the bed to dance the monster dance.";
    console.log(player.happiness);
    if (player.happiness <= 10) {
        player.happiness += 10;
        output += " The "+ person.name +" decides that you're sad and need a friend. Your happiness increases by 10 points.";
    } else {
        player.health -= 10;
        output += " The "+ person.name +" decides that you're too happy and bites you. You lose 10 health.";
    }
    player.health += 1;
    return output;
};

activity_deck.push(new Activity('kill', 'Play a little game', 'Your monster friend has an evil look in his eyes', 0));
function kill(person) {
    player.health += 1;
    var output = "PLACEHOLDER TEXT FOR MONSTER KILL";
    return output;
};

activity_deck.push(new Activity('baby_talk', 'Baby Talk', 'Your monster friend has an evil look in his eyes', 0));
function baby_talk(person) {
    player.health += 1;
    var output = person.name + " talk babytalk to you. Your health = " + player.health;
    return output;
};

activity_deck.push(new Activity('baby_feeding', 'Baby Feeding', 'Your monster friend has an evil look in his eyes', 0));
function baby_feeding(person) {
    player.health += 1;
    var output = person.name + " feed you. Your health = " + player.health;
    return output;
};

activity_deck.push(new Activity('babysitting', 'Babysitting', 'Your monster friend has an evil look in his eyes', 0));
function babysitting(person) {
    player.health += 1;
    var output = person.name + " babysits you. Your health = " + player.health;
    return output;
};

activity_deck.push(new Activity('smoking', 'Smoking', 'Your monster friend has an evil look in his eyes', 0));
function smoking(person) {
    player.health += 1;
    var output = person.name + " offers you a cigarrette. Your health = " + player.health;
    return output;
};

activity_deck.push(new Activity('drinking', 'Drinking', 'Your monster friend has an evil look in his eyes', 0));
function drinking(person) {
    player.happiness += 1;
    player.health -= 1;

    var output = person.name + " and you go drinking. Your happiness = " + player.happiness + ". Your health = " + player.health;
    count: 0;
    return output;
};

activity_deck.push(new Activity('partying', 'Partying', 'Your monster friend has an evil look in his eyes', 0));
function partying(person) {
    player.happiness += 1;
    var output = person.name + " and you go partying. Your happiness = " + player.happiness;
    return output;
};

activity_deck.push(new Activity('sex', 'Sex', 'Your monster friend has an evil look in his eyes', 0));
function sex(person) {
    player.health += 1;
    var output = person.name + " and you have sex. Your health = " + player.health;
    return output;
};

activity_deck.push(new Activity('dating', 'Dating', 'Your monster friend has an evil look in his eyes', 0));
function dating(person) {
    player.health += 1;
    var output = person.name + " and you have sex. Your health = " + player.health;
    return output;
};