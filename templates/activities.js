/*
new Activity('example_activity','Example First Description', 'Example activity description', 'Button Name', 0 , false);
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

/** STAGE ACTIONS
 * Stages have special non-person functions associated with
 * them that run when stage is first called.
 */

GAME_CARD = new Person('game', 'GAME', 'GAME', 'GAME', 'GAME', {}, 0, 10, 'parents', 'enemy',  0);

/**********************************************************************
 * STAGE INTRO
 * This runs at the beginning of a new stage.
 * At creation there is no difference between what happens at each stage
 * but there could be at some point.
 *
 * Stageintro is
 * TODO: stage1 - setHobbies
 * TODO: stage2 - setSocial_identity
 * TODO: stage3 - setProfession, set_kids, set_relationships
 * TODO: stage4 - setKids, set_profession
 */

function stageIntro() {
    var CURRENT_STAGE = getCurrentStage();
    $currentStage.html(CURRENT_STAGE.name);
}