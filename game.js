var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern=[];

var started=false;
var gameOver=false;

var level=0;
$(document).keydown(function(){
  if(!started){
    started=true;
    nextSequence();

  }
});



function nextSequence() {

level++;
$("h1").html("level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // 3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);
}



$(".btn").on("click",function(){
  var userChosenColor=this.getAttribute("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
//
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
  if(gamePattern.length===userClickedPattern.length){
    setTimeout(nextSequence,1000);
    userClickedPattern=[];
  }
}

  else
  {
    var audio=new Audio("wrong.mp3");
    audio.play();
    $("h1").html("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    startOver();
  }
}

function startOver(){
  started=false;
  gamePattern=[];
  userClickedPattern=[];
  level=0;
  
}

function playSound(inp){
  var audio = new Audio( inp + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed");},100);
}
