/*Created by currentuser on 1/21/15.*/
//will need to trigger this sound with choices.js code instead of event listener
function soundTrigger(){

    if(_ShakeTrigger == true) {
        var audio = new Audio('templates/audio/muted_beep_mod.mp3');
    }
    else{
        var audio = new Audio('templates/audio/electribe_click.mp3');
    }

    audio.play();


}

