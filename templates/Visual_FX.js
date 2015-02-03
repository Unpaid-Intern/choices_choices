/**
 * Created by currentuser on 1/22/15.
 */

function shakeStatusImg()
{
    if(_ShakeTrigger == true) {
        $(".status-img").effect("bounce", {times: 3}, "slow");
    }
    else{

        _ShakeTrigger = false;

    }
}


function animateDamageText()
{
    var $playerhealth = $("#player-health");

    if(_ShakeTrigger == true) {
    $playerhealth.clone()

    }
    else
    {


    }



}