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


//function animateDamageText() {

$(document).on("click",".choice-button", function(){
var $playerhealth = $(".player-health");
    if (_HealthChange != "undefined" && turn != 1  || _HealthChange != undefined  && turn != 1 ) {

        if (_HealthChange < 0 && _HealthChange != undefined && _HealthChange != 0 && _HealthChange != "undefined") {
            $playerhealth.toggle("fade");
            $playerhealth.toggle("fade");
            $playerhealth.append('<p id="healthchange" class="health-change" style="color:orangered">' + _HealthChange + '</p>');
            console.log("DAMAGE: health change: " + _HealthChange);
            $("#healthchange").effect("bounce", {times: 3}, "fast");
            $("#healthchange").animate({
                opacity: 0.0,
                fontSize: "5em",
                color: "red"
            }, 1000);



        }

        if (_HealthChange > 0 && _HealthChange != undefined && _HealthChange != 0 && _HealthChange != "undefined"){
            $playerhealth.toggle("fade");
            $playerhealth.toggle("fade");
            $playerhealth.append('<p id="healthchange" class = "health-change">+' + _HealthChange + '</p>');
            console.log("DAMAGE: health change: " + _HealthChange);
            $("#healthchange").effect("bounce", {times: 3}, "fast");
            $("#healthchange").animate({
                opacity: 0.0,
                fontSize: "5em",
                color: "blue"
            }, 1000);



        }
    }
   // if($(".health-change") != "undefined")
   // {
   //     $(".health-change").destroy();
   // }
    });

   // }


//}




