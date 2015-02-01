/**
 * Created by currentuser on 1/22/15.
 */
/*$( document ).click(function() {
    $( ".choice-button" ).effect( "shake" );
});*/


function shakeStatusImg()
{
if(_ShakeTrigger == true) {
    $(".status_img").effect("bounce", {times: 3}, "slow");
    
}
    else{

    _ShakeTrigger = false;

}
}
