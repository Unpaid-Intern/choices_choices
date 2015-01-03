/**
 * Created by currentuser on 1/2/15.
 */
$(document).ready(function(){

    var screensList = $(".is_nav");
    var currentScreenNum = 1;
    temp = screensList[0].innerHTML;
    screensList[0].innerHTML = screensList[1].innerHTML;

    // screen 1
    $( "#goto_start_screen" ).click(function() {

        screensList[0].innerHTML = screensList[1].innerHTML;
        currentScreenNum = 1;
    });


    //screen 2
    $( "#goto_choice_board" ).click(function() {
        temp = screensList[0].innerHTML;
        screensList[0].innerHTML = " ";
        $(".choice_board").removeClass("hidden");
        currentScreenNum = 2;
    });


    //screen 3
    $( "#goto_high_scores" ).click(function() {
        temp = screensList[0].innerHTML;
        screensList[0].innerHTML = screensList[3].innerHTML;
        currentScreenNum = 3;
    });


    //screen 4
    $( "#goto_obituaries" ).click(function() {
        temp = screensList[0].innerHTML;
        screensList[0].innerHTML = screensList[4].innerHTML;
        currentScreenNum = 4;
    });


    //screen 5
    $( "#goto_about" ).click(function() {
        temp = screensList[0].innerHTML;
        screensList[0].innerHTML = screensList[5].innerHTML;
        currentScreenNum = 5;
    });


    $("#back_to_start_screen").click(function(){
        $(".choice_board").addClass("hidden");
        screensList[0].innerHTML = screensList[1].innerHTML
        currentScreenNum = 1;

    });
});
