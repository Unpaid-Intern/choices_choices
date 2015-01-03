/**
 * Created by currentuser on 1/2/15.
 */
$(document).ready(function(){
var screensList = $(".is_nav");
var currentScreenNum = 1;
screensList[0].innerHTML = screensList[1].innerHTML;


// screen 1
$( "#goto_start_screen" ).click(function() {

    temp = screensList[0].innerHTML;
    console.log(temp);
    screensList[1].innerHTML = temp;
    currentScreenNum = 1;

});

//screen 2
$( "#goto_choice_board" ).click(function() {


});


//screen 3
$( "#goto_high_scores" ).click(function() {
});


//screen 4
$( "#goto_obituaries" ).click(function() {
});

//screen 5
$( "#goto_about" ).click(function() {
});
});
