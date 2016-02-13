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

//remove later and replace with global variable $playerHealth in engine.js
    var $playerhealth = $(".player-health");

    //if (typeof _HealthChange != "undefined" && turn != 1) {

        if (_HealthChange < 0) {
            $healthChange.empty();
            $playerhealth.toggle("fade");
            $playerhealth.toggle("fade");
            $healthChange.text(_HealthChange);

            console.log("DAMAGE: health change: " + _HealthChange);

            $healthChange.effect("bounce", {times: 3}, "fast");
            $healthChange
                .animate({
                    opacity: 1
                  }, 1)
                .animate({
                opacity: 0.0,
                fontSize: "5em",
                color: "red"
            }, 800, reset());


        }

        if (_HealthChange > 0 ) {
            $healthChange.empty();
            $playerhealth.toggle("fade");
            $playerhealth.toggle("fade");
            $healthChange.text("+" + _HealthChange);
            console.log("DAMAGE: health change: " + _HealthChange);
            $healthChange.effect("bounce", {times: 3}, "fast");
            $healthChange
                .animate({
                opacity: 1
                }, 1)
                .animate({
                opacity: 0.0,
                fontSize: "5em",
                color: "blue"
            }, 800, reset());

    }


    }



function reset()

{
   // $healthChange.empty();

    $healthChange.css("fontSize", ".5em");
    $healthChange.css("color", "white");

}

