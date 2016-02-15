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


// todo: add activities in order. activities will be ordered instead of linked to the people you know. activities are
// linked with age. if there's a tie in age for an activity, it's decided randomly  between them.

// function Diseases(id, name, description)
new Disease('rickets','Rickets','Rickets makes it hard to walk.');
new Disease('chickenPox', 'Chicken Pox','You got chicken pox');

// function Addiction(id, name, description)
new Addiction('sugar','Sugary Treats','Rickets makes it hard to walk.');

new Person('hobo','Hobo Pete', 'xxx', 'm', 'the street', {1:['buyDrugs'], 2:['buyDrugs'], 3:['buyDrugs'], 4:['buyDrugs']}, 0, 10, 'friend',  'friend', 1);
new Person('churchPeer','Dana', 'Wallace', 'f', 'the bar', {3:['church'], 4:['sex', 'church'],  5:['sex', 'church']}, 0, 10, 'friend',  'friend', 1);
new Person('parents','Mom', 'Your new mom', 'f', {0:['babyTalk', 'babyFeeding']}, 0, 10, 'mom','Your mom',0);
new Person('uncle', 'creepy Uncle Steve', 'Uncle Steve', 'm', {0:['babysitting']}, 0, 10, 'uncle', 'Your uncle',  0);
new Person('neighbor','Sally', 'a neighbor kid', 'f', {0:['babysitting']}, 0, 10, 'babysitter', 'friend',  0);
new Person('play_date', 'Freddy','another toddler', 'm', {0:['play']}, 0, 10, 'toddler','another random toddler',0);
