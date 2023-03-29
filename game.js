var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
// We need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
var level = 0;

$(document).keypress(function () {
	if (!started) {
		//"Press A Key to Start", when the game has started, change this to say "Level 0".
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

$(".btn").click(function () {

	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);
	// Call checkAnswer() after a user has clicked and chosen their answer,
	// passing in the index of the last answer in the user's sequence.
	checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
	// to check if last user answer is the same as the game pattern.
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log("wrong");
		playSound("wrong");
		$("body").addClass("game-over");
		$("#level-title").text("Game Over, Press Any Key to Restart");

		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}
}

function nextSequence() {
	// Reset the userClickedPattern to an empty array ready for the next level.
	userClickedPattern = [];
	// Increase the level by 1 every time nextSequence() is called
	level++;
	// Update the h1 with this change in the value of level
	$("#level-title").text("Level " + level);

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	// Add the new randomChosenColour generated in the previous step to the end of the gamePattern.
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
