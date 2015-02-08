/**
 * Created by currentuser on 1/22/15.
 */

function shakeStatusImg()
{
    if(_ShakeTrigger == true) {
        $(".status-img").effect("bounce", {times: 1}, "fast");
    }
    else{

        _ShakeTrigger = false;

    }
}


function animateDamageText() {

//remove later and replace with global variable $playerHealth in choices.js
    var $playerhealth = $(".player-health");

    //if (typeof _HealthChange != "undefined" && turn != 1) {

        if (_HealthChange < 0) {
            $playerhealth.toggle("fade");
            $playerhealth.toggle("fade");
            $healthChange.text(_HealthChange);

            console.log("DAMAGE: health change: " + _HealthChange);
            $healthChange.effect("bounce", {times: 3}, "fast");
            $healthChange
                .animate({
                    opacity: 1
                  }, 50)
                .animate({
                opacity: 0.0,
                fontSize: "5em",
                color: "red"
            }, 1000, emptyThis());


        }

        if (_HealthChange > 0 ) {
            $playerhealth.toggle("fade");
            $playerhealth.toggle("fade");
            $healthChange.text("+" + _HealthChange);
            console.log("DAMAGE: health change: " + _HealthChange);
            $healthChange.effect("bounce", {times: 3}, "fast");
            $healthChange
                .animate({
                opacity: 1
                }, 50)
                .animate({
                opacity: 0.0,
                fontSize: "5em",
                color: "blue"
            }, 1000, emptyThis());

    }


    }



function emptyThis()

{
   // $healthChange.empty();

    $healthChange.css("fontSize", ".5em");
    $healthChange.css("color", "white");

}

