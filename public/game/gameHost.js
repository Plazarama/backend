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
			IO.socket.on('newGameCreated', IO.onNewGameCreated);
			IO.socket.on('beginNewGame', IO.beginNewGame);

			// In game
			IO.socket.on('newQuestion', IO.onNewQuestion);
			IO.socket.on('responseAnswer', IO.onAnswered);

			// Player
			IO.socket.on('playerJoined', IO.onPlayerJoined);

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

		/**
		 * New game created in the server.
		 * Initialize new game in the host.
		 * @param data{{gameId: *, mySocketId: *}}
		 */
		onNewGameCreated: function(data) {
			//console.log(data);
			Game.Host.hostInit(data);
		},

		/**
		 * Received new question from the server.
		 * @param data{{question: *, correct: *, answers: []*}}
		 */
		onNewQuestion: function(data) {
			Game.Host.newQuestion(data);
		},

		/**
		 * New player joins the game
		 * @param data{{gameId: this game ID, mySocketId: socket of the player}}
		 */
		onPlayerJoined: function(data) {
			Game.Host.updateWaitingScreen(data);
		},

		/**
		 * All prepared to start the game
		 * @param data{{gameId: this game ID, mySocketId: socket of the host}}
		 */
		beginNewGame: function(data){
			Game.Host.gameCountDown(data);
		},

		/**
		 * One player answered a question, just passing the data to the host.
		 * @param data{{gameId: this game ID, playerId: socket of the player, answer: number of the answer}}
		 */
		onAnswered: function(data){
			Game.Host.playerAnswered(data);
		},

		/**
		 * Handle possible errors
		 * @param data{{message: errorMessage}}
		 */
		onError: function(data){
			console.log(data);
		}


	};


	var Game = {
		gameId: 0,
		mySocketId: '',

		/**
		 * Initialize the game
		 */
		init: function() {
			Game.getElements();
			Game.showInitScreen();
			Game.bindEvents();

		},

		/**
		 * Bind html elements.
		 */
		getElements: function() {
			Game.$doc = $(document);

			Game.$gameArea = $('#gameArea');
			Game.$hostScreen = $('#hostScreen').html();
			Game.$initScreen = $('#initScreen').html();
			Game.$newGame = $('#newGameScreen').html();

			Game.$gameFinished = $('#gameFinished').html();

		},

		/**
		 * Show the init screen when the game starts.
		 */
		showInitScreen: function(){
			Game.$gameArea.html(Game.$initScreen);
		},

		/**
		 * Bind clicked events
		 */
		bindEvents: function(){
			Game.$doc.on('click', '#btnHostGame', Game.Host.onCreate);

		},


		Host: {

			players: [],
			numPlayers: 0,
			currentCorrectAnswer: '',
			rounds: 0,


			/**
			 * Ask the host to create new game. User clicked on the button for being
			 * a host.
			 */
			onCreate: function(){
				IO.socket.emit('hostCreateNewGame');
			},

			/**
			 * New game created in the server.
			 * Initialize new game in the host.
			 * @param data{{gameId: *, mySocketId: *}}
			 */
			hostInit: function(data){
				Game.gameId = data.gameId;
				Game.mySocketId = data.mySocketId;

				Game.Host.displayNewGameScreen();
			},

			/**
			 * Display the details of the game for the users who wants to join.
			 */
			displayNewGameScreen: function(){
				Game.$gameArea.html(Game.$newGame);

				$('#gameURL').text(window.location.href);
				$('#gameID').text(Game.gameId);

			},


			displayHostScreen: function(){
				Game.$gameArea.html(Game.$hostScreen);
			},

			/**
			 * Update the waiting screen with the data of the users when a new user joins.
			 * @param data{{gameId: this game ID, mySocketId: socket of the player}}
			 */
			updateWaitingScreen: function(data){
				//console.log(data);
				$('#playersWaiting').append('<p/>').text('Player '+data);

				data.score = 0;
				console.log(data);
				Game.Host.players.push(data);
				Game.Host.numPlayers++;

				if(Game.Host.numPlayers == 2){
					//console.log(IO);
					IO.socket.emit('hostGameFull', Game.gameId);
				}
			},

			/**
			 * All prepared to start the game, do the countdown.
			 * @param data{{gameId: this game ID, mySocketId: socket of the host}}
			 */
			gameCountDown: function(data){
				Game.$gameArea.html(Game.$hostScreen);

				var $secondsLeft = $('#question');
				Game.countDown($secondsLeft, 5, function(){
					IO.socket.emit('hostCountdownFinished', Game.gameId);
				});
			},

			/**
			 * Received new question from the server.
			 * @param data{{question: *, correct: *, answers: []*}}
			 */
			newQuestion: function(data){
				console.log(data);
				$('#question').text(data.question);
				Game.Host.currentCorrectAnswer = data.correct;
				$('#answer1').text(data.answers[0]);
				$('#answer2').text(data.answers[1]);
				$('#answer3').text(data.answers[2]);
				$('#answer4').text(data.answers[3]);

			},

			/**
			 * One player answered a question.
			 * We check if the answer is correct or not.
			 * Here we also handle the round counts and determine if the game have finished yet.
			 * @param data{{gameId: this game ID, playerId: socket of the player, answer: number of the answer}}
			 */
			playerAnswered: function(data){
				console.log(data);
				if(data.answer == Game.Host.currentCorrectAnswer){
					for(var x=0; x<Game.Host.players.length; x++){
						if(Game.Host.players[x].mySocketId == data.playerId){
							Game.Host.players[x].score += 10;
						}
					}
					//console.log(Game.Host.players);

				}
				else{
					for(var j=0; j<Game.Host.players.length; j++){
						if(Game.Host.players[j].mySocketId == data.playerId){
							Game.Host.players[j].score -= 10;
						}
					}
					//console.log(Game.Host.players);
				}

				//Update the players score label
				for(var i=0; i<Game.Host.players.length; i++){
					$('#player'+(i+1)+'Score h3').text('Player '+(i+1)+' score: '+Game.Host.players[i].score);
				}

				Game.Host.rounds++;

				if(Game.Host.rounds == 10){
					console.log('game finished');

					Game.$gameArea.html(Game.$gameFinished);


					var gameFinishedData = {};
					if(Game.Host.players[0].score > Game.Host.players[1].score){
						//Player 1 Wins
						gameFinishedData = {
							winner: Game.Host.players[0],
							loser: Game.Host.players[1],
							gameData: Game.gameId
						};
					}
					else if(Game.Host.players[0].score < Game.Host.players[1].score){
						//Player 2 Wins
						gameFinishedData = {
							winner: Game.Host.players[1],
							loser: Game.Host.players[0],
							gameData: Game.gameId
						};
					}
					else if(Game.Host.players[0].score == Game.Host.players[1].score){
						//Equals!
						gameFinishedData = {
							eq1: Game.Host.players[1],
							eq2: Game.Host.players[0],
							gameData: Game.gameId
						};
					}

					IO.socket.emit('gameFinished', gameFinishedData);
				}
				else{
					console.log('new question');
					IO.socket.emit('getNewQuestion', Game.gameId);
				}

			}


		},

		//Utilities

		/**
		 * Display the countdown timer on the Host screen
		 *
		 * @param $el The container element for the countdown timer
		 * @param startTime
		 * @param callback The function to call when the timer ends.
		 */
		countDown: function($el, startTime, callback){
			$el.text("Game starting in: "+startTime);

			var timer = setInterval(countItDown, 1000);


			function countItDown(){
				startTime -= 1;
				$el.text("Game starting in: "+startTime);

				if(startTime <=0 ){

					clearInterval(timer);
					callback();
					return;
				}
			}
		}



	};


	IO.init();
	Game.init();
});
