
function monster_dance(person) {
    var output = person.firstName + " invites you under the bed to dance the monster dance.";
    console.log(player.happiness);
    if (player.happiness <= 10) {
        console.log("asdfasd");
        player.happiness += 10;
        output += " The "+ person.firstName +" decides that you're sad and need a friend. Your happiness increases by 10 points.";
        console.log(output);
    } else {
        player.health -= 10;
        output += " The "+ person.firstName +" decides that you're too happy and bites you. You lose 10 health.";
        console.log(output);
    }
    player.health += 1;
    return output;
};

function baby_talk(person) {
    player.health += 1;
    var output = person.firstName + " talk babytalk to you. Your health = " + player.health;
    return output;
};

function baby_feeding(person) {
    player.health += 1;
    var output = person.firstName + " feed you. Your health = " + player.health;
    return output;
};

function babysitting(person) {
    player.health += 1;
    var output = person.firstName + " babysits you. Your health = " + player.health;
    return output;
};

function smoking(person) {
    player.health += 1;
    var output = person.firstName + " offers you a cigarrette. Your health = " + player.health;
    return output;
};

function drinking(person) {
    player.happiness += 1;
    player.health -= 1;

    activity_choices = [

    ];

    var output = person.firstName + " and you go drinking. Your happiness = " + player.happiness + ". Your health = " + player.health;
    count: 0;
    return output;
};



function partying(person) {
    player.happiness += 1;
    var output = person.firstName + " and you go partying. Your happiness = " + player.happiness;
    return output;
};


function sex(person) {
    player.health += 1;
    var output = person.firstName + " and you have sex. Your health = " + player.health;
    return output;
};