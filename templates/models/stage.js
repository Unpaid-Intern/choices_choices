/**
 * Created by Nathan on 3/6/2016.
 */



/**************************************************************************************
 * STAGES
 * stages represent the stages of life that a player potentially goes through.
 * @param id
 * @param name
 * @param description
 * @param activities
 * @param prompts
 * @constructor
 * **************************************************************************** */
function Stage(id, name, description, activities, prompts) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.activities = activities;
    this.prompts = prompts;
    _Stages.push(this);
}
var _Stages = [];

new Stage(0, 'Infancy', 'The first 4 years of life are sometimes the most influential in determining habits and patterns.',[], []);
new Stage(1, 'Childhood', 'You could be president.',[], []);
new Stage(2, 'Teen years', 'You have so much potential!',[], []);
new Stage(3, 'Young Adulthood', 'You have the whole world ahead of you.',[], []);
new Stage(4, 'Adulthood', 'You are an adult now.',[], []);
new Stage(5, 'Old Age', 'They say life begins at 50.',[], []);

/** STAGE ACTIONS
 * Stages have special non-person functions associated with
 * them that run when stage is first called.
 */

GAME_CARD = new Person('game', 'GAME', 'GAME', 'GAME', {}, 0, 10, 'parents', 'enemy',  0);

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