/**
 * , ABUSE, INSECURE ATTACHMENT, LOW SES, ROUGH NEIGHBORHOOD
 * PREMATURE BIRTH
 */

/**
 * STAGE ACTIVITY: BIRTH
 * @activities: sports
 * @game_activities firstTooth
 *
 */

new Activity('birth','Your Birth', 'You are only born once!', 'Be born!', 0, 0);
function birth() {
    GAME_CARD.addActivity(0, 'drugsSugar');
    GAME_CARD.addActivity(1, 'drugsSugar');
    GAME_CARD.addActivity(2, 'drugsSugar');
    GAME_CARD.addActivity(3, 'drugsSugar');
    GAME_CARD.addActivity(4, 'drugsSugar');
    GAME_CARD.addActivity(5, 'drugsSugar');
    var output ='';
    var n = getRandomInt(0,3);
    GAME_CARD.addActivity(0, 'firstTooth');

    var g = getRandomInt(0,1);
    if (g === 1) {
        player.gender = 'm';
        output += 'You\'re born a boy! ';
    } else {
        player.gender = 'f';
        output += 'You\'re born a girl! ';
    }
    switch (n) {
        case 0:
            output += 'Your birth goes without problems. You are a healthy, happy baby.';
            player.updateHealth(10);
            player.happiness+=1;
            GAME_CARD.addActivity(1, 'sports');
            GAME_CARD.addActivity(2, 'sports');
            GAME_CARD.addActivity(3, 'sports');
            GAME_CARD.addActivity(4, 'sports');
            player.updateObituary('Born a healthy baby.');
            break;
        case 1:
            output += 'You are born prematurely and your health suffers.';
            player.updateHealth(-5);
            GAME_CARD.addActivity(1, 'sports');
            GAME_CARD.addActivity(2, 'sports');
            player.updateObituary('Born prematurely.');
            break;
        case 2:
            output += 'You are born with an ugly face.';
            player.attributes.push('ugly');
            player.updateObituary('Born with a hideous face.');
            break;
        case 3:
            output = 'Your teenage mother decides to break the cycle of poverty and gets ' +
            'an abortion. She goes on to a career as a powerful attorney and then later ' +
            'a senator. This, however, means that you were never born.';
            player.health = 0;
            player.state = 'dead';
            player.updateObituary('Was never born.');
    }
    return output;
}

new Activity('drugsSugar','Try Sugar', 'Eat some sugar', 'Sugar is very addictive.', 0 , false);
function drugsSugar(person) {
    var thisActivityObject = getActivity('drugsSugar');
    var output ='';
    var stageId = getCurrentStage().id;
    var n = getRandomInt(0,5);
    thisActivityObject.connection += n;
    switch (true) {
        case (n >= 20): // you are totally adduicted. you get obesity if you don't already have it.
            if (player.diseases['sugar'] === -1) {
                player.diseases.push('obesity');
            }
                if (player.addictions['sugar'] === -1) {
                player.addictions.push('sugar');
            } else {

            }
            output += 'You are completely addicted to sugar! Also you have ';
            player.updateHealth(-2);
            drugsSugar(person);
            thisActivityObject.connection += 2;
            break;
        case (n >= 15 ):
            output += 'You have a strong and negative reaction to sugar.';
            player.updateHealth(-1);
            player.updateHappiness(1);
            thisActivityObject.connection += 2;
            break;
        case (n===3 || n===2):
            output += 'You eat many healthy treats. While you love them, they are not exactly healthy for ' +
            'you and your health suffers.';
            player.updateHealth(-1);
            player.updateHappiness(1);
            thisActivityObject.connection += 2;
            break;
        default:
            player.updateHealth(1);
            output += 'You are exposed to sugar in moderation and you like it.';
    }
    return output;
}

new Activity('sports', 'Sports', 'Take up sports', 'Play sports', 0, false);
function sports() {
    player.updateHealth(3);
    return "You play sports. Your health improves!";
}

new Activity('firstTooth', 'Losing first tooth', 'Losing a tooth is a sign of maturity and adulthood.', 'See what the tooth fairy brings.', 0, false);
function firstTooth(person) {
    player.updateHealth(1);
    removeActivityFromPerson(getFunctionName(), person);
    return "PLACEHOLDER TEXT FOR FIRST TOOTH";
}

/**
 * STAGE ACTIVITY: setSocialClass
 * @activities: buyDrugs, church, sex
 */

new Activity('setSocialClass','Discover Social Class', 'Find out what social class you are', 'Discover', 0, 0);
function setSocialClass() {
    var output = "";
    var n = getRandomInt(0,2);
    switch (n) {
        case 0:
            player.socialClass = ['poor', 'Poor'];
            output += "You are born into a poor family.";
            new Person('hobo','Hobo Pete', 'xxx', 'm', 'the street', {1:['buyDrugs'], 2:['buyDrugs'], 3:['buyDrugs'], 4:['buyDrugs']}, 0, 10, 'friend',  'friend', 1);
            new Person('churchPeer','Dana', 'Wallace', 'f', 'the bar', {3:['church'], 4:['sex', 'church'],  5:['sex', 'church']}, 0, 10, 'friend',  'friend', 1);
            // TODO: push GAME activities to GAME person
            player.updateObituary('Born into poverty.');
            switch (getRandomInt(0,1)) {
                case 0:
                    output = ' Your are abandoned at an orphanage. You are raised ' +
                    'without any knowledge of your past.' +
                    'While you are there you develop rickets.';
                    var attribute = search(_Attributes, 'id', 'rickets');
                    attribute.connection += 2;
                    player.diseases.push('rickets');
                    player.updateObituary('Caught rickets due to poor nutrition.');
                    break;
                case 1:
                    output += " Your mom is forced to get you local day care while she " +
                    "works two jobs. You rarely see her. Parental connection is important " +
                    "as a child and your health suffers.";
                    player.updateHealth(-5);
                    player.updateObituary('Spent a childhood at daycare.');
                    break;
            }            break;
        case 1:
            player.socialClass = ['middleClass', 'Middle Class'];
            output += "You are born into a middle class family.";
            player.updateObituary('Middle class neighborhood.');
            switch (getRandomInt(0,0)) {
                case 0:
                    output += " You will be encouraged to study hard and go to college.";
                    player.health = 10;
                    console.log('Everyone knew you would be a doctor.');
                    break;
            }            break;
        case 2:
            player.socialClass = ['rich', 'Rich'];
            output += "You are born into a rich family.";
            player.updateObituary('Wanted for nothing.');
            if(player.health <= 10) {
                output += ' Any health issues are resolved through expensive medical techniques. Only the best for baby!'
            }
            break;
        default :
            player.socialClass = ['error', 'Error'];
            console.log("error with social class");
            break;
    }
    return output;
}

new Activity('buyDrugs','Try to buy drugs', 'Buy drugs', 'Button Name', 0, false);
function buyDrugs() {
    var output ='';
    var n = getRandomInt(0,1);
    var stageId = getCurrentStage().id;
    switch (true) {
        case (stageId === 1):         // WAY too young!
            switch (n) {
                case 0:
                    output += '';
                    break;
                case 1:
                    output += '';
                    break;
            }
            break;
        case (stageId === 2):         // too young?
            switch (n) {
                case 0:
                    output += '';
                    break;
                case 1:
                    output += '';
                    break;
            }
            break;
        default:                      // no problem
            switch (n) {
                case 0:
                    output += '';
                    break;
                case 1:
                    output += '';
                    break;
            }
            break;
    }
    return output;
}

new Activity('church','Example First Description', 'Example activity description', 'Button Name', 0, false);
function church() {
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

new Activity('sex', 'Sex', 'Sex can be healthy and happy or isolating and depressing', 'Description Placeholder', 0, false);
function sex(person) {
    var object = getActivity('sex');
    if (player.gender === 'm') {           // is male
        switch (player.attributes) {
            case('dating'):                         // dating
                break;
            case('married'):                        // married
                break;
            default:                                // single
                if(player.happiness < 5) {
                    player.updateHappiness(1);
                } else {
                    player.updateHappiness(2);
                }
                break;
        }
                player.updateHappiness(10 - object.connection);
        player.updateHealth(1);
        return person.name + " and you have sex. Your health improves.";
    } else {                                 // is female
        player.updateHappiness(1);
        player.updateHealth(1);
        return person.name + " and you have sex. Your health improves.";
    }
}

/**
 * STAGE ACTIVITY: setParents
 * @activities: babyTalk, babyFeeding, babysitting, play, monsterDance
 * @game_activities firstTooth
 */

new Activity('setParents','Your Parents', 'You can choose your friends but you don\'t get to choose your family.', 'Be born!', 0, 0);
//_Stages[0].activities.push('setParents');
function setParents() {
    var output ='';
    var n = getRandomInt(0,9);
    switch (true) {
        case (n <= 3):           // single mom
            output += 'You are born to a single mom.';
            new Person('parents','Mom', 'Your mom!', 'f', 'she made you', {0:['babyTalk', 'babyFeeding']}, 0, 10, 'parents','parents',0);
            new Person('uncle', 'Uncle Steve', '', 'm', 'family', {0:['babysitting']}, 0, 10, 'parents', 'enemy',  0);
            new Person('neighbor','Sally Fredricks', 'f', '', 'neighbor', {0:['babysitting']}, 0, 10, 'parents', 'enemy',  0);
            new Person('Freddy','Fred Armitage', '', 'm', 'playdate companion', {0:['play']}, 0, 10, 'parents','parents',0);
            player.updateObituary('Born to a loving mother.');
            break;
        case (n === 4 || n === 5): // unhappily married
            output += 'You are born to two loving parents. However they love themselves more than they love you.' +
            'They constantly bicker, fight and use you as a tool or an object to be won.';
            new Person('parents','Mom and Dad', '', 'pl', 'they made you', {0:['babyTalk', 'babyFeeding']}, 0, 10, 'parents','parents',0);
            new Person('uncle', 'Uncle Steve', '', 'm', 'family', {0:['babysitting']}, 0, 10, 'parents', 'enemy',  0);
            new Person('neighbor','Sally Fredricks', 'f', '', 'neighbor', {0:['babysitting']}, 0, 10, 'parents', 'enemy',  0);
            player.updateObituary('Born as a mistake.');
            break;
        case (n >= 6 && n <= 8): // happily married
            output += 'You are born to two loving parents.';
            new Person('parents','Mom & Dad', 'Mom and Dad', 'pl', 'they made you', {0:['babyTalk', 'babyFeeding']}, 0, 10, 'parents','parents',0);
            new Person('fred','Freddy', 'Fred Armitage', 'm', 'playdate companion', {0:['play']}, 0, 10, 'parents','parents',0);
            player.updateObituary('Born into a loving home.');
            break;
        case (n = 9):           // orphan
            output += 'You are an orphan. You do not know your parents';
            GAME_CARD.addActivity(3,'longLostParent');
            new Person('parents','The nuns', 'The nuns!', 'pl', 'They take care of you', {0:['babyTalk', 'babyFeeding']}, 0, 10, 'parents','parents',0);
            new Person('monster','Monster Under the Bed', '', 'm', 'long after midnight', {0:['monsterDance']}, 0, 10, 'enemy',  'enemy', 0);
            player.updateObituary('Born an orphan.');
            break;
    }
    return output;
}

/*
 Baby talk is very helpful for babies.
 Positive baby talk increases happiness and health.
 However, babies can be exposed to harmful situations which do the opposite.
 This should affect many future relationships due to how the baby is attached to their parent.
 */

new Activity('babyTalk', 'Baby Talk', 'I wonder what those adults are saying!',
    'Focus on your new found language skills', 0, false);
function babyTalk(person) {
    var output;
    var currentStageId = getCurrentStage().id;
    if (player.attributes.attachment === false) {
        player.attributes.attachment = getRandomInt(0,1);
    }
    switch (player.attachment) {
        // Good parents
        case 0:
            output = '<p>' + person.name + ' pay' + person.plural() + ' lots of ' +
            'attention to you. They love you and adore you. You create a strong ' +
            'emotional connection and develop language at an advanced rate. ' +
            'With happiness comes improved health.</p>';
            player.updateHealth(3);
            player.updateHappiness(3);
            player.obituary[currentStageId].push('Received lots of love and attention.');
            return output;
        // Bad parents
        case 1:
            output = '<p>' + person.name + ' pay' + person.plural() + ' little attention to you. Turns out that ' +
            'weak parental relationships affect your health and happiness. Your speech also suffers.';
            player.updateHealth(-3);
            player.updateHappiness(-3);
            player.updateObituary('Ignored as a child.');
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
function babyFeeding(person) {
    var output;
    var currentStageId = getCurrentStage().id;
    var num = getRandomInt(0,10);
    if(player.inventory.indexOf('badParents' != -1)) {
        var badParents = true;
        num +=1;
    }

    switch (true) {
        // Good parents
        case (num <=10):
            output = 'You drink of the finest breast milk.';
            player.updateHealth(10);
            player.updateHappiness(3);
            break;
        // Bad parents
        default :
            output = 'Your parents starve you.';
            player.updateHealth(-5);
            player.updateHappiness(-3);
            player.obituary[currentStageId].push('You were fed rocks as a child..');
            if(badParents === -1) {
                player.inventory.push('badParents');
            }
            console.log(badParents);
            break;
    }
    return output;
}
new Activity('babyFeeding', 'Baby Feeding', 'Nipples!', 'Feeling hungry?', 0, false);

/*
 Nutrition is very important for babies.
 Balanced organic foods are best but they're expensive.
 On the other hand babies can suffer from malnutrition even in the best of homes.
 */
new Activity('babysitting', 'Babysitting', 'You are left at home.', 'You are left at home.', 0, false);
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

new Activity('play', 'Play', 'Play.', 'PLAY', 0, false);
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

/*
 Monster befriends sad kids and bites happy ones. This makes the monster accessible in later levels.
 */

new Activity('monsterDance', 'Monster Dance', 'Dance the monster dance with the monster under the bed.', 'Dance with a monster', 0, false);
function monsterDance(person) {
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
new Activity('kill', 'Play a little game', 'Your monster friend has an evil look in his eyes', 'Your monster friend has an evil look in his eyes', 0, false);
function kill(person) {
    shuffle(player.personDeck);
    player.updateHappiness(1);
    return 'The monster kills' + 'A PERSON' + 'for you. ' +
        'THIS IS JUST A PLACEHOLDER.';
}