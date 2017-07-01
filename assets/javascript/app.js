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

	var intro = "<h2>CLICK THE BUTTON BELOW TO BEGIN</h2><br><button class='btn btn-default btn-lg' id='start' type='submit'>WOO HOO!</button";
	
	// ==============================================

	// Game Info
	// =======================================

	var wins = 0;

	var loses = 0;

	// =======================================

	// Final Screen
	// =======================================

	var gameOver = triviaQuestions.length;

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
			var stats = $("<div> <h2> Good Job </h2> <h3> Correct: " + wins + "</h3> <h3> Incorrect: " + loses + "</h3> <button class='btn btn-danger btn-lg' id='reset' type='submit'>Reset</button");
			$("#choices").html(stats);
		} else {
			var stats = $("<div> <h2> Better Luck Next Time </h2> <h3> Correct: " + wins + "</h3> <h3> Incorrect: " + loses + "</h3> <button class='btn btn-danger btn-lg' id='reset' type='submit'>Reset</button");
			$("#choices").html(stats);
		}

	}
}

function isRight() {
	wins++;
	$("#timer").empty();
	$("#choices").empty();
	var correct = $("<div> <h2> WOO HOO! You got that one right! </h2> <h3> Correct: " + wins + "</h3> <h3> Incorrect: " + loses + "</h3>");
	$("#timer").html(correct);
	// $("#choices").html(gif);
	setTimeout(transition, 5000);
}

function isWrong() {
	loses++;
	$("#timer").empty();
	$("#choices").empty();
	var correct = $("<div> <h2> D'oh!!! Better luck next time!</h2> <h3> Correct: " + wins + "</h3> <h3> Incorrect: " + loses + "</h3>");
	$("#timer").html(correct);
	var answer = $("<div> <h3>" + triviaQuestions[questionCounter].answer + "</h3> </div>");
	$("#choices").html(answer);
	setTimeout(transition, 5000);
}

function outOfTime() {
	loses++;
	$("#timer").empty();
	$("#choices").empty();
	var correct = $("<div> <h2> D'oh!!! Better luck next time!</h2> <h3> Correct: " + wins + "</h3> <h3> Incorrect: " + loses + "</h3>");
	$("#timer").html(correct);
	var answer = $("<div> <h3>" + triviaQuestions[questionCounter].answer + "</h3> </div>");
	$("#choices").html(answer);
	setTimeout(transition, 5000);
}

function transition() {
	questionCounter++;
	number = 30;
	isGameOver();
	generateHTML();
	clock();
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

$(document).ready(function() {	

// Begin game logic
// ======================================================

	//Start Page
	$("#choices").prepend(intro);

	//On-Click for start page
	$("body").on("click", "#start", function(event) {
		event.preventDefault();
		generateHTML();	
		clock();
	})

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
	})
	

}) //Close jQuery wrapper 



















