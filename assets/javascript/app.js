// Global Variables
//==========================================================================

	var triviaQuestions = [

		{
			"question": "In which town do the Simpsons reside?",
			"answer": "Springfield",
			"choices": ["Springfield", "Shelbyville", "Seinfeld"]
		},
		{
			"question": "What is the name of the Simpsons' next door neighbor?",
			"answer": "Ned Flanders",
			"choices": ["Barney Gumble", "Ned Flanders", "Principal Skinner"]
		},
		{
			"question": "How old is Bart?",
			"answer": "10",
			"choices": ["10", "11", "12"]
		},
		{
			"question": "What is the name of the clown on Channel 6?",
			"answer": "Krusty",
			"choices": ["Gabbo", "Krusty", "Bonko"]
		},
		{
			"question": "Who runs the Kwik-E-Mart?",
			"answer": "Apu",
			"choices": ["Apu", "Mr. Burns", "Bobo"]
		},
	];

	var themeSong = new Audio("assets/theSimpsons.mp3");

	// var clickCounter = 0;

	// Variable to save players answer choice
	// ======================================

	var playerChoice = "";

	// ======================================

	// Variable to store the index of the question that player is on
	// =============================================================

	var questionCounter = 0;

	//==============================================================

	// Variables related to the timer
	//================================

	var intervalId;

	var number = 30;

	//================================

	// Creates the text and button to start the game
	// ==============================================

	var intro = "<h1>Lets see how much you know about The Simpsons</h1><br><button class='btn btn-default btn-lg' id='start' type='submit'>BEGIN</button";

	// ==============================================

	// Game Info
	// =======================================

	var wins = 0;

	var loses = 0;

	// =======================================

	// Final Screen
	// =======================================

	var gameOver = triviaQuestions.length;
	console.log(gameOver);

// Functions
// ===============================================================================

function generateHTML() {
	//Placeholder for timer
	//Finds the question in the array and assigns it to question
	var question = $("<h2>").text(triviaQuestions[questionCounter].question);
	//Finds the individual answer choices in the array
	var choice0 = $("<h3 class='answer'>").html(triviaQuestions[questionCounter].choices[0]);
	var choice1 = $("<h3 class='answer'>").text(triviaQuestions[questionCounter].choices[1]);
	var choice2 = $("<h3 class='answer'>").text(triviaQuestions[questionCounter].choices[2]);
	//Empties id="choices" and appends the variables to the DOM
	$("#timer").empty();
	//Placeholder for appending timer
	$("#choices").empty();
	$("#choices").append(question, choice0, choice1, choice2);
}

function isGameOver() {
	if(gameOver === (wins + loses)) {
		$("#timer").empty();
		$("#choices").empty();
		var correct = $("<div> <h1> Game Over </h1>");
		$("#timer").html(correct);
		if (wins >= 3) {
			var stats = $("<div> <h2> Good Job </h2> <h3> Correct: " + wins + "</h3> <h3> Incorrect: " + loses + "</h3> <button class='btn btn-default btn-lg' id='reset' type='submit'>Restart</button>");
			$("#choices").html(stats);
		} else {
			var stats = $("<div> <h2> Better Luck Next Time </h2> <h3> Correct: " + wins + "</h3> <h3> Incorrect: " + loses + "</h3> <button class='btn btn-default btn-lg' id='reset' type='submit'>Restart</button");
			$("#choices").html(stats);
		}

	}
}

function isRight() {
	wins++;
	$("#timer").empty();
	$("#choices").empty();
	var correct = $("<div> <h2> WOO HOO! You got that one right! </h2> <h3> Correct: " + wins + "</h3> <h3> Incorrect: " + loses + "</h3>");
	$("#choices").html(correct);
	// $("#choices").html(gif);
	setTimeout(transition, 5000);
}

function isWrong() {
	loses++;
	$("#timer").empty();
	$("#choices").empty();
	var correct = $("<div> <h2> D'oh!!! Better luck next time!</h2> <h3> Correct: " + wins + "</h3> <h3> Incorrect: " + loses + "</h3>");
	$("#choices").html(correct);
	var answer = $("<div> <h3>Correct Answer: " + triviaQuestions[questionCounter].answer + "</h3> </div>");
	$("#choices").append(answer);
	setTimeout(transition, 5000);
}

function outOfTime() {
	loses++;
	$("#timer").empty();
	$("#choices").empty();
	var correct = $("<div> <h2> D'oh!!! Better luck next time!</h2> <h3> Correct: " + wins + "</h3> <h3> Incorrect: " + loses + "</h3>");
	$("#choices").html(correct);
	var answer = $("<div> <h3>Correct Answer: " + triviaQuestions[questionCounter].answer + "</h3> </div>");
	$("#choices").append(answer);
	setTimeout(transition, 5000);
}

function transition() {
	questionCounter++;
	number = 30;
	if(gameOver === (wins + loses)) {
	  isGameOver();
	} else {
	  generateHTML();
	  clock();
	}
}

function clock() {
	intervalId = setInterval(decrement, 1000);
	function decrement() {

		$("#timer").html("<h2>Time Remaining: " + number + "<h2>");

		if (number === 0) {
			clearInterval(intervalId);
			outOfTime();
		}
		if (number > 0) {
			number--;
		}
	}
}

function reset() {
	wins = 0;
	loses = 0;
	questionCounter = 0;
	generateHTML();
	clock();
}

// $(".answer").mouseenter(function() {
// 		// $(".answer").css("background-color", blue);
// 	})

// 	$("h3").mouseleave(function() {
// 		// $(".answer").css("background-color", #A7DBD8);
// 	})
// }	

$(document).ready(function() {

// Begin game logic
// ======================================================

	//Start Page
	$("#choices").prepend(intro);

	themeSong.play();

	//On-Click for start page
	$("body").on("click", "#start", function(event) {
		event.preventDefault();

		generateHTML();
		clock();
		themeSong.pause();
	})

	 // $("h3 .answer").on("mouseenter", function(){
  //       $("h3 .answer").css("background-color", "yellow");
  //   });
  //   $(".answer").mouseleave(function(){
  //       $(".answer").css("background-color", "lightgray");
  //   });

	$("body").on("click", ".answer", function() {
		playerChoice = $(this).text();
		if (playerChoice === triviaQuestions[questionCounter].answer) {
			clearInterval(intervalId);
			isRight();
			console.log("You got it right!");
		} else {
			clearInterval(intervalId);
			isWrong();
			console.log("You got it wrong!");
		}
		console.log(playerChoice);
		console.log(triviaQuestions[questionCounter].answer);
	})

	$("body").on("click", "#reset", function() {
		reset();
		console.log("click");
	})




}); //Close jQuery wrapper
