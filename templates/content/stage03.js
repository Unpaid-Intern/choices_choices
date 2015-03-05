

new Activity('purchase_transportation','You just got into an accident', 'Example activity description', 'Button Name', 0 , 3);
function purchase_transportation() {
    var output ='You need to get around town.';
    var n = getRandomInt(0,3);
    switch (n) {
        case 0:
            output += 'Against the wishes of your elders and society\'s expectations you decide to purchase a motorcyle.';
            player.transportation = 'motorcycle';
            player.updateHappiness(5);
            break;
        case 1:
            output += 'You get a bike.';
            player.updateHealth(3);
            player.transportation = 'bicycle';
            break;
        case 2:
            output += 'You decide to purchase a car.';
            player.transportation = 'car';
            GAME_CARD.addActivity(4, 'car_breakdown');
            break;
        case 3:
            output += 'Along with much of the city\'s indigent you decide to use the bus';
            player.transportation = 'bus';
            break;
    }
    return output;
}

new Activity('transportation_accident','You just got into an accident', 'Example activity description', 'Button Name', 0 , false);
function transportation_accident() {
    var output ='';
    var mod = getActivity('drinking').connection;
    switch (player.transportation) {
        case 'walking':
            mod += 1;
            break;
        case 'car':
            mod += 3;
            break;
        case 'motorcycle':
            mod += 7;
            break;
        case 'bicycle':
            mod += 3;
            break;
    }
    n = getRandomInt(0,100) + mod;
    if(n >= 90) {
        output += 'you get into an accident';
        player.updateHealth(-20);
    }
    return output;
}

new Activity('car_breakdown','You just got into an accident', 'Example activity description', 'Button Name', 0 , 4);
function car_breakdown() {
    var output ='Your car breaks down';
    player.transportation = 'walking';
    GAME_CARD.addActivity(4, 'car_repairs');
    return output;
}


new Activity('car_repair','You just repaired your car', 'Example activity description', 'Button Name', 0 , 4);
function car_repair() {
    var output ='Your car gets fixed';
    player.transportation = 'car';
    player.money -= 100;
    return output;
}
