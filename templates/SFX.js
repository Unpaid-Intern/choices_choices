/*Created by currentuser on 1/21/15.*/
//will need to trigger this sound with choices.js code instead of event listener
function soundTrigger()
    {
        if(_ShakeTrigger == true) {
            var audio = new Audio('templates/audio/SFX/Health_Down.mp3');
        }
        else{
            var audio = new Audio('templates/audio/SFX/Select_Choice.mp3');
        }
    audio.play();
    }

function gameOverSound()
{
    var audio = new Audio('templates/audio/SFX/Game_Over.mp3');
    audio.play();
}