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
			console.log(data);
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
			console.log("begin");
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
			bonus: 0,


			/**
			* Ask the host to create new game. User clicked on the button for being
			* a host.
			*/
			onCreate: function(){
				console.log('Start');
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
				data.correct = 0;
				data.won = 0;
				data.lose = 0;
				data.played = false;
				console.log(data);
				Game.Host.players.push(data);
				Game.Host.numPlayers++;

				if(Game.Host.numPlayers == 4){
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

				for(var x=0; x<Game.Host.players.length; x++) {
					$('#player'+(x+1)+'Score h3').text(Game.Host.players[x].name +' score: '+Game.Host.players[x].score);
				}
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
				for(var x=0; x<Game.Host.players.length; x++) {
					Game.Host.players[x].played = false;
					$('#player'+(x+1)+'Score h3').text(Game.Host.players[x].name +' score: '+Game.Host.players[x].score);
				}

				if(Game.Host.bonus == 0) {
					if(Game.Host.rounds == 9) {
						Game.Host.bonus = 1;
					}
					else if (Game.Host.rounds >= 5) {
						if(Math.random() > 0.5)
						Game.Host.bonus = 1;
					}
				}
				else if (Game.Host.bonus == 1) {
					Game.Host.bonus = 2;
				}
				console.log(data);
				console.log("Bonus ?" + Game.Host.bonus);
				if(Game.Host.bonus === 1) {
					$('#question').text(data.question + ' -- BONUS !!!');
				}
				else {
					$('#question').text(data.question);
				}

				console.log(data);
				$('#quesImg').html('');
				if(data.type === "Image"){
					$('<img src="'+ data.questionImg +'" width="300px" height="300px">').load(function() {
					  $(this).appendTo('#quesImg');
					});
				}
				Game.Host.currentCorrectAnswer = data.correct;
				$('#answer1').text(data.answers[0]);
				$('#answer2').text(data.answers[1]);
				$('#answer3').text(data.answers[2]);
				$('#answer4').text(data.answers[3]);

				Game.Host.rounds++;

				var timer = setInterval(countItDown, 1000);
				var startTime = 10;

				function countItDown(){
					startTime -= 1;

					if(startTime <= 0){
						clearInterval(timer);

						if(Game.Host.rounds == 10){
							console.log('game finished');

							Game.$gameArea.html(Game.$gameFinished);

							var resultArray = Array();
							Game.Host.players.forEach(elem => {
								resultArray.push({player: elem});
							});
							resultArray.sort(function(a, b){return a.player.score < b.player.score ? 1 : (a.player.score > b.player.score ? -1 : 0);});
							resultArray[0].player.won = 1;
							resultArray[resultArray.length - 1].player.lose = 1;

							var gameFinishedData = {
								result: resultArray,
								gameData: Game.gameId
							};

							console.log(gameFinishedData);

							IO.socket.emit('gameFinished', gameFinishedData);
						}
						else{
							console.log('new question');
							IO.socket.emit('getNewQuestion', Game.gameId);
						}
						return;
					}
					else {
						console.log(startTime);
						IO.socket.emit('timeTicked', startTime);
					}
				}

			},

			/**
			* One player answered a question.
			* We check if the answer is correct or not.
			* Here we also handle the round counts and determine if the game have finished yet.
			* @param data{{gameId: this game ID, playerId: socket of the player, answer: number of the answer}}
			*/
			playerAnswered: function(data){
				console.log(data);

				for(var x=0; x<Game.Host.players.length; x++){
					if(Game.Host.players[x].mySocketId.indexOf(data.playerId) > -1 && !Game.Host.players[x].played){
						if(data.answer == Game.Host.currentCorrectAnswer){
							Game.Host.players[x].score += 2;
							if(Game.Host.bonus == 1) {
								Game.Host.players[x].score += 2;
							}
							Game.Host.players[x].correct += 1;
							Game.Host.players[x].played = true;
						}
					}
				}

				//Update the players score label
				for(var i=0; i<Game.Host.players.length; i++){
					console.log(Game.Host.players);
					$('#player'+(i+1)+'Score h3').text(Game.Host.players[i].name +' score: '+Game.Host.players[i].score);
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
			$el.text("Game starting in: "+ startTime);

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
