
/*****************************************************************************
 * ACTIVITIES
 * The Activity class currently is paired with a function that shares the same id.
 * an Activity object is accessed by search(activity_deck, 'id', <activity_id_string>)
 * Person objects have an activities field which contain these activity_id_strings
 *
 * Objects are created right before their function. The function will later be made a method but for now we're testing
 * to see if we like the basic structure of activities as objects.

    ACTIVITIES TO BE CREATED
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

************************************************************************************ */



function Activity(id, name, first_description, description, connection) {
    this.id = id;
    this.name = name;
    this.first_description = first_description;
    this.description = description;
    this.connection = connection;
}

var activity_deck = []; // activity_deck holds all Activity objects

function createActivity(id, name, first_description, description, connection, stage_number) {
    var new_activity = activity_deck.push(id, name, first_description, description, connection);
    activity_deck.push(new_activity);
    if(isNaN(stage_number) === false) {
        stages[stage_number].activities.push(new_activity.id);
    }
    return(new_activity);
}

function getActivity(activity_id) {
    return search(activity_deck, 'id', activity_id);
}

/**
 * returns the name of the function that called it.
 * @returns {Function}
 */
function getFunctionName() {
    return arguments.callee.caller;
}


/**
 * cycles through an Person's stages, removing the activity entirely from that person
 * @param activity_id
 * @param person
 */

function removeActivityFromPerson(activity_id, person) {
    for(var i=0; i < stages.length; i++) {
        var index = person.activities[i].indexOf(activity_id);
        if (index >= -1) {
            person.activities[i].splice(index);
        }
    }
}

/*
activity_deck.push(new Activity('example_activity','Example First Description', 'Example activity description', 'Button Name', '0' ));
stages[0].activities.push('example_activity');
function example_activity() {
    var output ='';
    var n = getRandomInt(0,3);
    switch (n) {
        case 0:
            output += '';
            break;
        case 1:
            output += '';
            break;
        case 2:
            output += '';
            break;
        case 3:
            output += '';
            break;
    }
    return output;
}
*/

/*
    Monster befriends sad kids and bites happy ones. This makes the monster accessible in later levels.
*/

activity_deck.push(new Activity('monster_dance', 'Monster Dance', 'Dance the monster dance with the monster under the bed.', 'Dance with a monster', 0));
function monster_dance(person) {
    var output = person.name + " invites you under the bed to dance the monster dance.";
    console.log(player.happiness);
    if (player.happiness <= 10) {
        player.updateHappiness(10);
        output += " The "+ person.name +" decides that you're sad and need a friend. Your happiness increases by 10 points.";
    } else {
        player.updateHealth(-10);
        output += " The "+ person.name +" decides that you're too happy and bites you. You lose 10 health.";
    }
    player.updateHealth(1);
    return output;
}
/*
    Using the monster to kill can act as garbage collection for unused people. It should have unpredictable consequences.
*/
activity_deck.push(new Activity('kill', 'Play a little game', 'Your monster friend has an evil look in his eyes', 'Your monster friend has an evil look in his eyes', 0));
function kill(person) {
    shuffle(person_deck);
    player.updateHappiness(1);
    return 'The monster kills' + 'A PERSON' + 'for you. ' +
        'THIS IS JUST A PLACEHOLDER.';
}

activity_deck.push(new Activity('first_tooth', 'Losing first tooth', 'Losing a tooth is a sign of maturity and adulthood.', 'See what the tooth fairy brings.', 0));
function first_tooth(person) {
    player.updateHealth(1);
    removeActivityFromPerson(getFunctionName(), person);
    return "PLACEHOLDER TEXT FOR FIRST TOOTH";
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
    switch (getRandomInt(0,1)) {
        // Good parents
        case 0:
            output = '<p>' + person.name + ' pay' + person.plural() + ' lots of ' +
            'attention to you. They love you and adore you. You create a strong ' +
            'emotional connection and develop language at an advanced rate. ' +
                'With happiness comes improved health.</p>';
            player.updateHealth(3);
            player.updateHappiness(3);
            player.obituary[current_stage_id].push('You were born to parents who loved and paid attention to you.');
            return output;
        // Bad parents
        case 1:
            output = '<p>' + person.name + ' pay' + person.plural() + ' little attention to you. Turns out that ' +
            'weak parental relationships affect your health and happiness. Your speech also suffers.';
            player.updateHealth(-3);
            player.updateHappiness(-3);
            player.obituary[current_stage_id].push('You were born to parents who ignored you.');
            break;
    }
    return output;
}

/*
 Nutrition is very important for babies.
 Balanced organic foods are best but they're expensive.
 Balanced organic foods are best but they're expensive.
 On the other hand babies can suffer from malnutrition even in the best of homes.
 */
activity_deck.push(new Activity('baby_feeding', 'Baby Feeding', 'Nipples!', 'Feeling hungry?', 0));
function baby_feeding(person) {
    var output;
    var current_stage_id = getCurrentStage().id;
    var num = getRandomInt(0,10);
    if(player.inventory.indexOf('bad_parents' != -1)) {
        var bad_parents = true;
        num +=1;
    }

    switch (true) {
        // Good parents
        case (num <=10):
            output = '<p>You drink of the finest breast milk.</p>';
            player.updateHealth(10);
            output += '<p>Health: ' + getSignedNumber(3) + '<br>' + 'Happiness: ' + getSignedNumber(3) + '</p>';
            break;
        // Bad parents
        default :
            output = '<p>Your parents starve you.</p>';
            player.updateHealth(-5);
            player.updateHappiness(-3);
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
activity_deck.push(new Activity('babysitting', 'Babysitting', 'You are left at home.', 'You are left at home.', 0));
function babysitting(person) {
    var output = '';
    player.updateHealth(1);
    output += 'Your parents have busy lives and ask ' + person.name + ' to babysit you.';
    if(person.happiness <=10) {
        output += ' It turns out that there is a reason why ' + person.name +
        ' does not have children. It is a lousy experience for both of you.';
    } else {
        output += person.name + ' brings lots of cool toys and you guys play.';
        player.updateHappiness(2);
        person.happiness += 2;
        person.connection +=5;
    }
    return output;
}

/*
 Smoking is a bad habit for your health but also very enjoyable. It's easy to get addicted to and has fast diminishing
 returns. The earlier the habit is formed, the harder it is to quit. Stress can affect a smoker and long term puts
 the person at risk for lung cancer.
 */
activity_deck.push(new Activity('smoke', 'Smoking', 'First Description Placeholder', 'Description Placeholder', 0));
function smoke(person) {
    if (player.attributes['smoking']) {
    }
    player.updateHealth(-1);
    return person.name + " offers you a cigarrette. Your health = " + player.health;
}

activity_deck.push(new Activity('drink', 'Drinking', 'First Description Placeholder', 'Description Placeholder', 0));
function drink(person) {
    player.updateHappiness(1);
    player.updateHealth(-1);

    return person.name + " and you go drinking." + ". Your health = " + player.health;
}

activity_deck.push(new Activity('party', 'Partying', 'First Description Placeholder', 'Description Placeholder', 0));
function party(person) {
    player.happiness += 1;
    player.updateHealth(0);
    return person.name + " and you go partying.";
}

activity_deck.push(new Activity('sex', 'Sex', 'Sex can be healthy and happy or isolating and depressing', 'Description Placeholder', 0));
function sex(person) {

    if(player.attributes['single']) {
        if(player.happiness < 5) {
            player
        }
    } else {

    }

    player.updateHealth(1);
    return person.name + " and you have sex. Your health improves";
}

activity_deck.push(new Activity('date', 'Dating', 'First Description Placeholder', 'Description Placeholder', 0));
function date(person) {
    player.updateHealth(1);
    return person.name + " and you date. Your health improves."
}


activity_deck.push(new Activity('sports', 'Sports', 'Take up sports', 'Play sports', 0));
function sports() {
    player.updateHealth(3);
    return "You play sports. Your health improves!";
}
/** STAGE ACTIONS
 * Stages have special non-person functions associated with
 * them that run when stage is first called.
 */

activity_deck.push(new Activity('birth','Your Birth', 'You are only born once!', 'Be born!', '0' ));
stages[0].activities.push('birth');
function birth() {
    var output ='';
    var n = getRandomInt(0,3);
    game_card = getPerson('game');

    switch (n) {
        case 0:
            output += 'Your birth goes without problems. You are a healthy, happy baby.';
            player.updateHealth(10);
            player.happiness+=1;
            game_card.addActivity(1, 'sports');
            game_card.addActivity(2, 'sports');
            game_card.addActivity(3, 'sports');
            game_card.addActivity(4, 'sports');
            break;
        case 1:
            output += 'You are born prematurely and your health suffers.';
            player.updateHealth(-5);
            game_card.addActivity(1, 'sports');
            game_card.addActivity(2, 'sports');
            break;
        case 2:
            output += 'You are born with an ugly face.';
            player.attributes.push('ugly');

            break;
        case 3:
            output += 'Your teenage mother decides to break the cycle of poverty and gets ' +
            'an abortion. She goes on to a career as a powerful attorney and then later ' +
            'a senator. This, however, means that you were never born.';
    }
    return output;
}

activity_deck.push(new Activity('set_social_class','Discover Social Class', 'Find out what social class you are', 'Discover', '0' ));
stages[0].activities.push('set_social_class');
function set_social_class() {
    var output = "";
    var n = getRandomInt(0,2);
    switch (n) {
        case 0:
            player.social_class = ['poor', 'Poor'];
            output += "You are born into a poor family.";
            // TODO: push people to person_deck
            // TODO: push GAME activities to GAME person
            break;
        case 1:
            player.social_class = ['middle_class', 'Middle Class'];
            output += "You are born into a middle class family.";
            break;
        case 2:
            player.social_class = ['rich', 'Rich'];
            output += "You are born into a rich family.";
            break;
        default :
            player.social_class = ['error', 'Error'];
            console.log("error with social class");
            break;
    }
    n = player.social_class;
    switch (n[0]) {
        case 'poor':
            switch (getRandomInt(0,1)) {
                case 0:
                    output = ' Your are abandoned at an orphanage. You are raised ' +
                    'without any knowledge of your past.' +
                    'While you are there you develop rickets.';
                    var attribute = search(attributes, 'id', 'rickets');
                    attribute.connection += 2;
                    player.attributes.push(attribute);
                    break;
                case 1:
                    output += " Your mom is forced to get you local day care while she " +
                    "works two jobs. You rarely see her. Parental connection is important " +
                    "as a child and your health suffers.";
                    player.updateHealth(-5);
                    break;
            }
            break;
        case 'middle_class':
            switch (getRandomInt(0,0)) {
                case 0:
                    output += " You will be encouraged to study hard and go to college.";
                    player.health = 10;
                    evaluateGameState();
                    break;
            }
            break;
        case 'rich':
            output += (" You were born into a rich family.");
            if(player.health <= 10) {
                output += ' Any health issues are resolved through expensive medical techniques. Only the best for baby!'
            }
            break;
        default:
            console.log('fallthrough');
    }

    return output;
}

activity_deck.push(new Activity('set_parents','Your Parents', 'You can choose your friends but you don\'t get to choose your family.', 'Be born!', '0' ));
stages[0].activities.push('set_parents');
function set_parents() {
    var output ='';
    var n = getRandomInt(0,10);
    switch (true) {
        case (n <= 3):           // single mom
            output += 'You are born to a single mom.';
            createPerson('parents','Mom', 'Your mom!', 'f', 'she made you', {0:['baby_talk', 'baby_feeding']}, 10, 10, 'parents','parents',0);
            createPerson('uncle', 'Uncle Steve', '', 'm', 'family', {0:['babysitting']}, 10, 10, 'parents', 'enemy',  0);
            createPerson('neighbor','Sally Fredricks', 'f', '', 'neighbor', {0:['babysitting']}, 10, 10, 'parents', 'enemy',  0);

            break;
        case (n >= 4 && n <= 5): // unhappily married
            output += 'You are born to two loving parents. However they love themselves more than they love you.' +
            'They constantly bicker, fight and use you as a tool or an object to be won.';
            createPerson('parents','Mom and Dad', '', 'pl', 'they made you', {0:['baby_talk', 'baby_feeding']}, 10, 10, 'parents','parents',0);
            createPerson('uncle', 'Uncle Steve', '', 'm', 'family', {0:['babysitting']}, 10, 10, 'parents', 'enemy',  0);
            createPerson('neighbor','Sally Fredricks', 'f', '', 'neighbor', {0:['babysitting']}, 10, 10, 'parents', 'enemy',  0);

            break;
        case (n >= 6 && n <= 8): // happily married
            output += 'You are born to two loving parents. However they love themselves more than they love you.' +
            'They constantly bicker, fight and use you as a tool or an object to be won.';
            createPerson('parents','Mom and Dad', '', 'pl', 'they made you', {0:['baby_talk', 'baby_feeding']}, 10, 10, 'parents','parents',0);
            break;
        case (n = 9):           // orphan
            output += 'You are an orphan. You do not know your parents';
            game_card.addActivity(3,'long_lost_parent');
            createPerson('parents','The nuns', 'The nuns!', 'pl', 'They take care of you', {0:['baby_talk', 'baby_feeding']}, 10, 10, 'parents','parents',0);
            createPerson('monster','Monster Under the Bed', '', 'm', 'long after midnight', {0:['monster_dance']}, 10, 10, 'enemy',  'enemy', 0);

            break;
        case (n = 10):          // abortion
            output += 'Your teenage mother decides to break the cycle of poverty and gets ' +
            'an abortion. She goes on to a career as a powerful attorney and then later ' +
            'a senator. This, however, means that you were never born.';
            player.state = 'dead';
    }
    return output;
}


activity_deck.push(new Activity('first_grade', 'First Day of School', 'Your first day of first grade.', 'Button Name', 0));
stages[1].activities.push('first_grade');
function first_grade() {
    var output ='';
    var n = getRandomInt(0,3);
    switch (n) {
        case 0:
            createPerson('school_crush', 'Sally', 'Sally Hendricks', 'f', 'school', {1:['bully'],2:['smoke', 'date'], 3:['date'], 4:['date']}, 0, 20, 'bully', 'hot_girl', 1);
            createPerson('bully', 'Sally', 'Sally Hendricks', 'f', 'school', {1:['bully']}, 0, 20, 'bully', 'friend', 1);
            createPerson('jock', 'Percy', 'Percival Willackers', 'm', 'school', {1:['bully']}, 0, 20, 'bully', 'friend', 1);
            createPerson('nerd', 'Sally', 'Sally Hendricks', 'f', 'school', {1:['bully']}, 0, 20, 'bully', 'friend', 1);
            output += 'Th other kids hate you.';
            break;
        case 1:
            createPerson('school_crush', 'Sally', 'Sally Hendricks', 'f', 'school', {1:['play'],2:['smoke', 'date'], 3:['date'], 4:['date']}, 0, 20, 'friend', 'hot_girl', 1);
            output += 'You like school and you feel like you will make lots of friends here.';
            break;
        case 2:
            createPerson('school_crush', 'Sally', 'Sally Hendricks', 'f', 'school', {1:['play'],2:['smoke', 'date'], 3:['date'], 4:['date']}, 0, 20, 'friend', 'hot_girl', 1);
            output += 'You like school and you feel like you will make lots of friends here.';
            break;
        case 3:
            createPerson('school_crush', 'Sally', 'Sally Hendricks', 'f', 'school', {1:['play'],2:['smoke', 'date'], 3:['date'], 4:['date']},0, 20, 'friend', 'hot_girl', 1);
            output += 'You like school and you feel like you will make lots of friends here.';
            break;
    }
    return output;
}

activity_deck.push(new Activity('play', 'Play', 'Play.', 'PLAY', 0));
function play(person) {
    var output ='';
    var n = getRandomInt(0,4) + person.connection;
    switch (true) {
        case (n = 0):
            removePerson(person);
            player.updateHappiness(-2);
            output += 'You and '+ person.name +' don\'t get along. '+ person.objective() +' Starts spreading ' +
            'rumours about you. You avoid each other at school.';
            break;
        case (n = 4 && person.state !== 'besties'):
            player.updateHappiness(4);
            person.state = 'besties';
            person.connection += 5;
            output += 'You have fun with '+ person.name +' You are best friends!.';
            break;
        default:
            player.updateHappiness(1);
            output += 'Playing is fun. You pass the time while the grown ups drink.';
            break;
    }
    return output;
}



/**********************************************************************
 * STAGE INTRO
 * This runs at the beginning of a new stage.
 * At creation there is no difference between what happens at each stage
 * but there could be at some point.
 *
 * Stageintro is
 * TODO: stage1 - set_hobbies
 * TODO: stage2 - set_social_identity
 * TODO: stage3 - set_profession, set_kids, set_relationships
 * TODO: stage4 - set_kids, set_profession
 */

function stageIntro() {
    var CURRENT_STAGE = getCurrentStage();
    $current_stage.html(CURRENT_STAGE.name);
}