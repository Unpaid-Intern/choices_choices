




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
    var output = person.firstName + " and you go drinking. Your happiness = " + player.happiness;
    return output;
};


function sex(person) {
    player.health += 1;
    var output = person.firstName + " and you have sex. Your health = " + player.health;
    return output;
};
