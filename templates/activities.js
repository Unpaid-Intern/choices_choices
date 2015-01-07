// action names are stored as strings Person objects

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

function kill(person) {
    player.health += 1;
    var output = "PLACEHOLDER TEXT FOR MONSTER KILL";
    return output;
};

function baby_talk(person) {
    player.health += 1;
    var output = person.name + " talk babytalk to you. Your health = " + player.health;
    return output;
};

function baby_feeding(person) {
    player.health += 1;
    var output = person.name + " feed you. Your health = " + player.health;
    return output;
};

function babysitting(person) {
    player.health += 1;
    var output = person.name + " babysits you. Your health = " + player.health;
    return output;
};

function smoking(person) {
    player.health += 1;
    var output = person.name + " offers you a cigarrette. Your health = " + player.health;
    return output;
};

function drinking(person) {
    player.happiness += 1;
    player.health -= 1;

    activity_choices = [

    ];

    var output = person.name + " and you go drinking. Your happiness = " + player.happiness + ". Your health = " + player.health;
    count: 0;
    return output;
};

function partying(person) {
    player.happiness += 1;
    var output = person.name + " and you go partying. Your happiness = " + player.happiness;
    return output;
};

function sex(person) {
    player.health += 1;
    var output = person.name + " and you have sex. Your health = " + player.health;
    return output;
};

function dating(person) {
    player.health += 1;
    var output = person.name + " and you have sex. Your health = " + player.health;
    return output;
};