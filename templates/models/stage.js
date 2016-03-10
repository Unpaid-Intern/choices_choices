/**
 * Created by Nathan on 3/6/2016.
 */

var _Stages = [];

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