var io;
var gameSocket;
var questionNums;

var Questions = require('../models/QuizQuestion');
var Users = require('../models/User');
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
	questionNums = new Array();
	gameSocket.emit('connected', {message: 'User connected'});

	// Host binds
	gameSocket.on('hostCreateNewGame', hostCreateNewGame);
	gameSocket.on('hostGameFull', hostPrepareGame);
	gameSocket.on('hostCountdownFinished', hostStartGame);
	gameSocket.on('getNewQuestion', hostGetNewQuestion);
	gameSocket.on('gameFinished', gameFinished);
	gameSocket.on('timeTicked', timeTicked);

	// Player binds
	gameSocket.on('playerJoinGame', playerJoinGame);
	gameSocket.on('playerAnswered', playerAnswered);
};


/* *******************************
   *                             *
   *       HOST FUNCTIONS        *
   *                             *
   ******************************* */

function hostCreateNewGame() {
	var thisGameId = 1; // TODO: (Math.random() * 10000) | 0;

	console.log(thisGameId);
	gameSocket.join(thisGameId.toString(), function(){
		io.to(thisGameId).emit('newGameCreated', {gameId: thisGameId, mySocketId: gameSocket.id});
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

function hostGetNewQuestion(gameId){
	sendQuestion(gameId);
}

function gameFinished(finishedData){
	finishedData.result.forEach(elem => {
		console.log(elem);
		Users.findOneAndUpdate({_id: elem.player.dbId},{$inc: {score: elem.player.score, played: Number(1), won: elem.player.won, lose: elem.player.lose, correct: elem.player.correct}},function(err, user){
			if(err)
			console.log(err);
			else {
				finishedData.result[finishedData.result.indexOf(elem)].player.name = user.name;
				if(finishedData.result.indexOf(elem) == (finishedData.result.length - 1)) {
					sendResult();
				}

				function sendResult() {
					console.log(finishedData.result[0].player);
					io.emit('gameFinished', finishedData);
				}
			}
		});
	});
}

function timeTicked(time) {
	io.emit('timeTicked', time);
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

/**
 * One player answered a question, just passing the data to the host.
 * @param data{{gameId: this game ID, playerId: socket of the player, answer: number of the answer}}
 */
function playerAnswered(data){
	console.log(data);
	io.to(data.gameId).emit('responseAnswer', data);
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
			while(questionNums.indexOf(randQuest) >= 0) {
				randQuest = random.integer(0, questions.length-1);
			}
			questionNums.push(randQuest);
			//console.log(questions[randQuest]);

			//Random questions.

			var quest = questions[randQuest];
			var questImg = quest.questionImage;

			var answers = [quest.correctAnswer, quest.secondAnswer, quest.thirdAnswer, quest.fourthAnswer];
			var shuffledAnswers = shuffleReturningCorrect(answers);

			var questionShuffled = {
				question: quest.question,
				type: quest.questionType,
				correct: shuffledAnswers.correct,
				answers: shuffledAnswers.answers,
				questionImg: questImg
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
