/**
 * Created by Nathan on 2/13/2016.
 */
/**
 *     // ATTRIBUTES
 this.health = health; // player dies when it reaches 0
 this.happiness = happiness;      // player loses or gains options when it increases/decreases
 this.money = 0;
 this.transportation = "walking";
 this.relationshipStatus = 'single';
 this.addictions = [];
 this.obituary = {0:[], 1:[],2:[],3:[],4:[],5:[]};
 this.causeOfDeath = 'Unknown';

 */



new Status(0, 'Rich', 'Above 200k/yr');
new Status(1, 'Middle Class', '30k-200k/yr');
new Status(2, 'Poor', 'Less than 30k/yr');

// todo: add activities in order. activities will be ordered instead of linked to the people you know. activities are
// linked with age. if there's a tie in age for an activity, it's decided randomly  between them.

// function Diseases(id, name, description)
new Disease('rickets','Rickets','Rickets makes it hard to walk.');
new Disease('chickenPox', 'Chicken Pox','You got chicken pox');

// function Addiction(id, name, description)
new Addiction('sugar','Sugary Treats','Rickets makes it hard to walk.');


//function Person(id, name, firstDisplayName, gender, activities, connection, happiness, state,
//                stateDescription, stage, health, money, inventory, transportation, diseases,
//                relationshipStatus, addictions, obituary, causeOfDeath, personDeck)
new Person('hobo','Hobo Pete', 'xxx', 'm', 'the street', {1:['buyDrugs'], 2:['buyDrugs'], 3:['buyDrugs'], 4:['buyDrugs']}, 0, 10, 'friend',  'friend', 1);
new Person('churchPeer','Dana', 'Wallace', 'f', 'the bar', {3:['church'], 4:['sex', 'church'],  5:['sex', 'church']}, 0, 10, 'friend',  'friend', 1);
new Person('parents','Mom', 'Your new mom', 'f', {0:['babyTalk', 'babyFeeding']}, 0, 10, 'mom','Your mom',0);
new Person('uncle', 'creepy Uncle Steve', 'Uncle Steve', 'm', {0:['babysitting']}, 0, 10, 'uncle', 'Your uncle',  0);
new Person('neighbor','Sally', 'a neighbor kid', 'f', {0:['babysitting']}, 0, 10, 'babysitter', 'friend',  0);
new Person('play_date', 'Freddy','another toddler', 'm', {0:['play']}, 0, 10, 'toddler','another random toddler',0);


// function Event(id, name, description, operation, range, stageNumber)
// BIRTH
new Event('birth', '0.0','Your Humble Beginning','Time to join the earth','additive', [{0,1,''}]);
currentPlayer = new Person();

status = getRandomInt(0,2);
console.log('you are born!');
// define name
// define status
