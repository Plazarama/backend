var io;
var gameSocket;

var Questions = require('../models/QuizQuestion');
var random = require("random-js")();

/**
 * This function is called by index.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */

exports.initGame = function(sio, socket){
	io = sio;
	gameSocket = socket;
	gameSocket.emit('connected', {message: 'User connected'});

	gameSocket.on('hostCreateNewGame', hostCreateNewGame);
	gameSocket.on('hostGameFull', hostPrepareGame);
	gameSocket.on('hostCountdownFinished', hostStartGame);



	gameSocket.on('playerJoinGame', playerJoinGame);

};


/* *******************************
   *                             *
   *       HOST FUNCTIONS        *
   *                             *
   ******************************* */

function hostCreateNewGame() {
	var thisGameId = 1;//(Math.random() * 10000) | 0;


	gameSocket.join(thisGameId.toString(), function(){
		gameSocket.emit('newGameCreated', {gameId: thisGameId, mySocketId: gameSocket.id});
	});
}

function hostPrepareGame(gameId){
	var sock = this;
	var data = {
		mySocketId: sock.id,
		gameId: gameId
	};

	io.to(data.gameId).emit('beginNewGame', data);
}


function hostStartGame(gameId){
	console.log('NEW GAME STARTED');
	sendQuestion(gameId);
}



/* *******************************
   *                             *
   *       Player FUNCTIONS      *
   *                             *
   ******************************* */


function playerJoinGame(data){
	var sock = this;
	//Search the room
	var room = io.sockets.adapter.rooms[data.gameId];

	//If the room exists
	if(room !== undefined){
		data.mySocketId = sock.id;

		sock.join(data.gameId, function(){
			io.to(data.gameId).emit('playerJoined', data);
		});

	} else{
		io.to(data.gameId).emit('error', {message: 'The room does not exist.'});
	}
}




/* *************************
   *                       *
   *      GAME LOGIC       *
   *                       *
   ************************* */


function sendQuestion(gameId){
	Questions.find(function(err, questions){
		if(err)
			console.log(err);
		if(questions){
			var randQuest = random.integer(0, questions.length-1);
			//console.log(questions[randQuest]);
			
			//Random questions.

			var quest = questions[randQuest];

			var answers = [quest.correctAnswer, quest.secondAnswer, quest.thirdAnswer, quest.fourthAnswer];
			var shuffledAnswers = shuffleReturningCorrect(answers);



			var questionShuffled = {
				question: quest.question,
				correct: shuffledAnswers.correct,
				answers: shuffledAnswers.answers
			};

			console.log(questionShuffled);

			io.to(gameId).emit('newQuestion', questionShuffled);



		}
		else{
			io.to(gameId).emit('error', {message: 'error getting questions on server'});
		}
	});
}




/* *************************
   *                       *
   *       Utilities       *
   *                       *
   ************************* */


function shuffleReturningCorrect(array) {
    var counter = array.length, temp, index;
    var correct = 0, firstTime = true;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = random.integer(0, counter-1);
        
        // Decrease counter by 1
        counter--;

        if(index === 0 && firstTime){
        	correct = counter;
        	firstTime = false; 
        }

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    var data = {
    	answers: array,
    	correct: correct
    };

    return data;
}