jQuery(function($) {
	'use strict';


	/**
	 * SocketIO object, with methods and functions related to the connexion.
	 */
	var IO = {

		/**
		 * Init socket. Connect this client to the server.
		 * After connection bind the events of socket.
		 */
		init: function() {
			IO.socket = io.connect('http://localhost:3000');
			IO.bindEvents();

		},

		/**
		 * Here we're going to bind all the events that happen to IO.
		 */
		bindEvents: function() {
			IO.socket.on('connected', IO.onConnected);

			//Pre-game
			IO.socket.on('beginNewGame', IO.beginNewGame);

			// In game
			IO.socket.on('newQuestion', IO.onNewQuestion);

			// Player
			IO.socket.on('playerJoined', IO.onPlayerJoined);
			IO.socket.on('gameFinished', IO.onGameFinished);

			//Error handler
			IO.socket.on('error', IO.onError);
		},

		/*
		 * The client is connected
		 */
		onConnected: function(data) {
			console.log(data);
			Game.mySocketId = IO.socket.id;
		},

		beginNewGame: function(data){
			Game.Player.gameCountDown(data);
		},

		onNewQuestion: function(data) {
			console.log(data);
			Game.Player.newQuestion(data);
		},

		onPlayerJoined: function(data) {
			Game.Player.updateWaitingScreen(data);
		},
		onGameFinished: function(data){
			Game.Player.gameFinished(data);
		},

		onError: function(data){
			console.log(data);
		}
	};


	var Game = {
		gameId: 0,
		mySocketId: '',

		init: function() {
			Game.getElements();
			Game.showInitScreen();
			Game.bindEvents();

		},

		getElements: function() {
			Game.$doc = $(document);

			Game.$gameArea = $('#gameArea');
			Game.$initScreen = $('#initScreen').html();
			Game.$joinScreen = $('#joinScreen').html();


			Game.$finishedGame = $('#finishedGame').html();
			Game.$playerScreen = $('#playerScreen').html();

		},

		showInitScreen: function(){
			Game.$gameArea.html(Game.$initScreen);
		},


		bindEvents: function(){
			Game.$doc.on('click', '#btnJoinGame', Game.Player.onJoinClick);
            Game.$doc.on('click', '#btnStart', Game.Player.onPlayerStartClick);

            Game.$doc.on('click', '.answer', Game.Player.onPlayerAnswered);
		},




		Player: {
			hostSocketId: '',
			currentCorrectAnswer: '',


			onJoinClick: function(){
				Game.$gameArea.html(Game.$joinScreen);
			},


			onPlayerStartClick: function(){
				var joiningGameId = $('#inputGameId').val();

				var data = {
					gameId: joiningGameId
				};

				IO.socket.emit('playerJoinGame', data);

			},

			updateWaitingScreen: function(data){
				if(IO.socket.id === data.mySocketId){
					Game.gameId = data.gameId;

					$('#playerWaiting')
						.append('</p>')
						.text('Joined Game '+Game.gameId+'. Wait for other players.');
				}

			},

			gameCountDown: function(data){
				Game.$gameArea.html(Game.$playerScreen);

				$('#answer1').text("Preparing the game..");
			},

			newQuestion: function(data){
				Game.Player.currentCorrectAnswer = data.correct;
				$('#answer1').text(data.answers[0]);
				$('#answer2').text(data.answers[1]);
				$('#answer3').text(data.answers[2]);
				$('#answer4').text(data.answers[3]);
			},


			onPlayerAnswered: function(targetElement){

				/* We are getting the element clicked, so we need to extract
				which is the answer clicked. For that first we get the ID where
				we have the number of the answer in the form "answerX" so we need
				to extract the answer text. We do this with the function SPLIT,
				this returns us an array of elements, we get the second element
				(the number) and minus 1 for getting the correct answer. */
				var answerN = targetElement.target.id.split('answer')[1]-1;
				console.log(answerN);


				// If the answer is correct return true, if not, false.

				var data = {
				    gameId: Game.gameId,
				    playerId: Game.mySocketId,
				    answer: answerN,
				};

				IO.socket.emit('playerAnswered', data);

			},

			gameFinished: function(winner){
				Game.$gameArea.html(Game.$finishedGame);

				if(winner){
					console.log('winner');
					$('#gameResult').text('YOU WIN!! :D');
				}
				else{
					console.log('you lost!');
					$('#gameResult').text('YOU LOST!! :(');

				}
			}
		}


	};


	IO.init();
	Game.init();
});
