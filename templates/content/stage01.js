
/*****************************************************************************
 * ACTIVITIES
 * The Activity class currently is paired with a function that shares the same id.
 * an Activity object is accessed by search(_Activities, 'id', <activityIdString>)
 * Person objects have an activities field which contain these activityIdStrings
 *
 * Objects are created right before their function. The function will later be made a method but for now we're testing
 * to see if we like the basic structure of activities as objects.

 ACTIVITIES TO BE CREATED
 CHOICES CAUSE MORE CHOICES LATER IN LIFE
 PEOPLE
 PATTERNS / HABITS
 PASSIONS / OBSESSIONS
 COPING: DISTRACTIONS/DELIGHT, SPIRITUALITY, SOCIAL SUPPORT, PHYSICAL EXCERCISE, RELAXATION
 TRAVEL
 MENTOR
 RISK FACTORS: DOING DRUGS, SMOKING TOBACCO
 LOW FRIENDS/SOCIALIZATION
 PARENTS GET DIVORCED IS NOT A RISK FACTOR
 BEING FEMALE: MORE RISK FOR DEPRESSION, ANXIETY MALE: MORE PROBLEMS W/AGGRESSION

 ************************************************************************************ */

/**
 * STAGE ACTIVITY: firstGrade
 * @activities: bully, smoke, play
 *
 */

new Activity('firstGrade', 'First Day of School', 'Your first day of first grade.', 'Button Name', 0, 1);
//_Stages[1].activities.push('firstGrade');
function firstGrade() {
    var output ='';
    var n = getRandomInt(0,0);
    switch (n) {
        case 0:
            new Person('schoolCrush', 'Sally', 'Sally Hendricks', 'f', 'school', {1:['bully'],2:['smoke', 'date'], 3:['date'], 4:['date']}, 0, 20, 'bully', 'hot_girl', 1);
            new Person('bully', 'Sally', 'Sally Hendricks', 'f', 'school', {1:['bully']}, 0, 20, 'bully', 'friend', 1);
            new Person('jock', 'Percy', 'Percival Willackers', 'm', 'school', {1:['bully']}, 0, 20, 'bully', 'friend', 1);
            new Person('nerd', 'Sally', 'Sally Hendricks', 'f', 'school', {1:['bully']}, 0, 20, 'bully', 'friend', 1);
            output += 'Th other kids hate you.';
            player.updateObituary('Unpopular in school.');
            break;
        case 1:
            new Person('schoolCrush', 'Sally', 'Sally Hendricks', 'f', 'school', {1:['play'],2:['smoke', 'date'], 3:['date'], 4:['date']}, 0, 20, 'friend', 'hot_girl', 1);
            output += 'You like school and you feel like you will make lots of friends here.';
            player.updateObituary('Made friends in school.');
            break;
        case 2:
            new Person('schoolCrush', 'Sally', 'Sally Hendricks', 'f', 'school', {1:['play'],2:['smoke', 'date'], 3:['date'], 4:['date']}, 0, 20, 'friend', 'hot_girl', 1);
            output += 'You like school and you feel like you will make lots of friends here.';
            player.updateObituary('Made friends in school.');
            break;
        case 3:
            new Person('schoolCrush', 'Sally', 'Sally Hendricks', 'f', 'school', {1:['play'],2:['smoke', 'date'], 3:['date'], 4:['date']},0, 20, 'friend', 'hot_girl', 1);
            output += 'You like school and you feel like you will make lots of friends here.';
            player.updateObituary('Made friends in school.');
            break;
    }
    return output;
}

/*
 Smoking is a bad habit for your health but also very enjoyable. It's easy to get addicted to and has fast diminishing
 returns. The earlier the habit is formed, the harder it is to quit. Stress can affect a smoker and long term puts
 the person at risk for lung cancer.
 */
new Activity('smoke', 'Smoking', 'First Description Placeholder', 'Description Placeholder', 0, false);
function smoke(person) {
    if (player.attributes['smoking']) {
    }
    player.updateHealth(-1);
    return person.name + " offers you a cigarrette. Your health = " + player.health;
}

new Activity('date', 'Dating', 'First Description Placeholder', 'Description Placeholder', 0, false);
function date(person) {
    player.updateHealth(1);
    return person.name + " and you date. Your health improves."
}

new Activity('bully','Example First Description', 'Example activity description', 'Button Name', 0 , false);
function bully() {
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

/*********************************************************
 * *  STAGE 02 - TEEN YEARS!!!!
 *
 *  BULLY VS BULLIED VS BOTH
 FIRST LOVE
 BEING A WALLFLOWER
 SUICIDAL FRIEND
 UNREQUITED LOVE
 DRIVER'S LICENSE, LOSING VIRGINITY, FIRST KISS, DRUG EXPERIENCES, COLLEGE/CAREER, SCHOOL DANCES, OPPOSITE SEX IN GENERAL IS WEIRD
 STUDYING FOR TEST, NOT BEING SOCIALIZED IS TOUGH
 HAVING A PARENT WITH A MENTAL ILLNESS


 */


new Activity('drink', 'Drinking', 'First Description Placeholder', 'Description Placeholder', 0, false);
function drink(person) {
    player.updateHappiness(1);
    player.updateHealth(-1);

    return person.name + " and you go drinking." + ". Your health = " + player.health;
}

new Activity('party', 'Partying', 'First Description Placeholder', 'Description Placeholder', 0, false);
function party(person) {
    player.happiness += 1;
    player.updateHealth(0);
    return person.name + " and you go partying.";
}