/*
    The Activity class currently is paired with a function that shares the same id.
    an Activity object is accessed by search(activity_deck, 'id', <activity_id_string>)
    Person objects have an activities field which contain these activity_id_strings

    Objects are created right before their function. The function will later be made a method but for now we're testing
    to see if we like the basic structure of activities as objects.
*/

/* ACTIVITIES TO BE CREATED
    CHOICES CAUSE MORE CHOICES LATER IN LIFE
    PEOPLE
    PATTERNS / HABITS
    BULLY VS BULLIED VS BOTH
    FIRST LOVE
    BEING A WALLFLOWER
    SUICIDAL FRIEND
    UNREQUITED LOVE
    PASSIONS / OBSESSIONS
    COPING: DISTRACTIONS/DELIGHT, SPIRITUALITY, SOCIAL SUPPORT, PHYSICAL EXCERCISE, RELAXATION
    TRAVEL
    MENTOR
    RISK FACTORS: PREMATURE BIRTH, DOING DRUGS, SMOKING TOBACCO, ABUSE, INSECURE ATTACHMENT, LOW SES, ROUGH NEIGHBORHOOD
        LOW FRIENDS/SOCIALIZATION
    PARENTS GET DIVORCED IS NOT A RISK FACTOR
    BEING FEMALE: MORE RISK FOR DEPRESSION, ANXIETY MALE: MORE PROBLEMS W/AGGRESSION
    DRIVER'S LICENSE, LOSING VIRGINITY, FIRST KISS, DRUG EXPERIENCES, COLLEGE/CAREER, SCHOOL DANCES, OPPOSITE SEX IN GENERAL IS WEIRD
    STUDYING FOR TEST, NOT BEING SOCIALIZED IS TOUGH
    HAVING A PARENT WITH A MENTAL ILLNESS


 */


function Activity(id, name, first_description, description, connection) {
    this.id = id;
    this.name = name;
    this.first_description = first_description;
    this.description = description;
    this.connection = connection;
}

var activity_deck = []; // activity_deck holds all Activity objects


/*
    Monster befriends sad kids and bites happy ones. This makes the monster accessible in later levels.
*/

activity_deck.push(new Activity('monster_dance', 'Monster Dance', 'Dance the monster dance with the monster under the bed.', 'Dance with a monster', 0));
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
}
/*
    Using the monster to kill can act as garbage collection for unused people. It should have unpredictable consequences.
*/

activity_deck.push(new Activity('kill', 'Play a little game', 'Your monster friend has an evil look in his eyes', 'Your monster friend has an evil look in his eyes', 0));
function kill(person) {
    player.health += 1;
    var output = "PLACEHOLDER TEXT FOR MONSTER KILL";
    return output;
}

/*
 Baby talk is very helpful for babies.
 Positive baby talk increases happiness and health.
 However, babies can be exposed to harmful situations which do the opposite.
 This should affect many future relationships due to how the baby is attached to their parent.
 */

activity_deck.push(new Activity('baby_talk', 'Baby Talk', 'I wonder what those adults are saying!',
    'Focus on your new found language skills', 0));
function baby_talk(person) {
    var output;
    var current_stage_id = getCurrentStage().id;
    switch (num = getRandomInt(0,1)) {
        // Good parents
        case 0:
            output = '<p>' + person.name + ' pay' + person.plural() + ' lots of attention to you. They love you and ' +
                'adore you. You create a strong emotional connection and develop language at an advanced rate. ' +
                'With happiness comes improved health.</p>';
            player.health += 3;
            player.happiness += 3;
            output += '<p>Health: ' + getSignedNumber(3) + '<br>' + 'Happiness: ' + getSignedNumber(3) + '</p>';
            player.obituary[current_stage_id].push('You were born to parents who loved and paid attention to you.');
            return output;
        // Bad parents
        case 1:
            output = '<p>' + person.name + ' pay' + person.plural() + ' little attention to you. Turns out that ' +
            'weak parental relationships affect your health and happiness. Your speech also suffers.';
            player.health -= 3;
            player.happiness -= 3;
            output += '<p>Health: ' + getSignedNumber(-3) + '<br>' + 'Happiness: ' + getSignedNumber(-3) + '</p>';
            player.obituary[current_stage_id].push('You were born to parents who ignored you.');
            break;
    }
    return output;
}

/*
 Nutrition is very important for babies.
 Balanced organic foods are best but they're expensive.
 On the other hand babies can suffer from malnutrition even in the best of homes.
 */
activity_deck.push(new Activity('baby_feeding', 'Baby Feeding', 'First Description Placeholder', 'Description Placeholder', 10000));
function baby_feeding(person) {
    var output;
    var current_stage_id = getCurrentStage().id;
    var num = getRandomInt(0,1);
    if(player.inventory.indexOf('bad_parents' != -1)) {
        var bad_parents = true;
        num +=1;
    }

    switch (num) {
        // Good parents
        case 0:
            output = '<p>You drink of the finest breast milk.</p>';
            player.health += 10;
            output += '<p>Health: ' + getSignedNumber(3) + '<br>' + 'Happiness: ' + getSignedNumber(3) + '</p>';
            break;
        // Bad parents
        default :
            output = '<p>Your parents starve you.</p>';
            player.health -= 10;
            output += '<p>Health: ' + getSignedNumber(-10) + '<br>' + 'Happiness: ' + getSignedNumber(-3) + '</p>';
            player.obituary[current_stage_id].push('You were fed rocks as a child..');
            if(bad_parents === -1) {
                player.inventory.push('bad_parents');
            }
            console.log(bad_parents);
            break;
    }
    return output;
}

/*
 Nutrition is very important for babies.
 Balanced organic foods are best but they're expensive.
 On the other hand babies can suffer from malnutrition even in the best of homes.
 */
activity_deck.push(new Activity('babysitting', 'Babysitting', 'First Description Placeholder', 'Description Placeholder', 0));
function babysitting(person) {
    player.health += 1;
    var output = person.name + " babysits you. Your health = " + player.health;
    return output;
}

/*
 Smoking is a bad habit for your health but also very enjoyable. It's easy to get addicted to and has fast diminishing
 returns. The earlier the habit is formed, the harder it is to quit. Stress can affect a smoker and long term puts
 the person at risk for lung cancer.
 */
activity_deck.push(new Activity('smoking', 'Smoking', 'First Description Placeholder', 'Description Placeholder', 0));
function smoking(person) {

    if (player.attributes['smoking']) {

    }

    player.health -= 1;


    var output = person.name + " offers you a cigarrette. Your health = " + player.health;
    return output;
}

activity_deck.push(new Activity('drinking', 'Drinking', 'First Description Placeholder', 'Description Placeholder', 0));
function drinking(person) {
    player.happiness += 1;
    player.health -= 1;

    var output = person.name + " and you go drinking. Your happiness = " + player.happiness + ". Your health = " + player.health;
    count: 0;
    return output;
}

activity_deck.push(new Activity('partying', 'Partying', 'First Description Placeholder', 'Description Placeholder', 0));
function partying(person) {
    player.happiness += 1;
    var output = person.name + " and you go partying. Your happiness = " + player.happiness;
    return output;
}

activity_deck.push(new Activity('sex', 'Sex', 'First Description Placeholder', 'Description Placeholder', 0));
function sex(person) {
    player.health += 1;
    var output = person.name + " and you have sex. Your health = " + player.health;
    return output;
}

activity_deck.push(new Activity('dating', 'Dating', 'First Description Placeholder', 'Description Placeholder', 0));
function dating(person) {
    player.health += 1;
    var output = person.name + " and you have sex. Your health = " + player.health;
    return output;
}