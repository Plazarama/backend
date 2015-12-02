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
			IO.socket = io.connect();
			IO.bindEvents();

		},

		/**
		 * Here we're going to bind all the events that happen to IO.
		 */
		bindEvents: function() {
			IO.socket.on('connected', IO.onConnected);
			IO.socket.on('newGameCreated', IO.onNewGameCreated);
			IO.socket.on('beginNewGame', IO.beginNewGame);


			IO.socket.on('newQuestion', IO.onNewQuestion);


			IO.socket.on('playerJoined', IO.onPlayerJoined);


			IO.socket.on('error', IO.onError);
		},

		/*
		 * The client is connected
		 */
		onConnected: function(data) {
			console.log(data);
			Game.mySocketId = IO.socket.id;
		},


		onNewGameCreated: function(data) {
			//console.log(data);
			Game.Host.hostInit(data);
		},

		onNewQuestion: function(data) {
			Game.Host.newQuestion(data);
		},

		onPlayerJoined: function(data) {
			Game.Host.updateWaitingScreen(data);
		},

		beginNewGame: function(data){
			Game.Host.gameCountDown(data);
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
			Game.$hostScreen = $('#hostScreen').html();
			Game.$initScreen = $('#initScreen').html();
			Game.$newGame = $('#newGameScreen').html();

		},

		showInitScreen: function(){
			Game.$gameArea.html(Game.$initScreen);
		},


		bindEvents: function(){
			Game.$doc.on('click', '#btnHostGame', Game.Host.onCreate);

		},


		Host: {

			players: [],
			numPlayers: 0,
			currentCorrectAnswer: '',


			onCreate: function(){
				IO.socket.emit('hostCreateNewGame');
			},

			hostInit: function(data){
				Game.gameId = data.gameId;
				Game.mySocketId = data.mySocketId;

				Game.Host.displayNewGameScreen();
			},

			displayNewGameScreen: function(){
				Game.$gameArea.html(Game.$newGame);

				$('#gameURL').text(window.location.href);
				$('#gameID').text(Game.gameId);

			},

			displayHostScreen: function(){
				Game.$gameArea.html(Game.$hostScreen);
			},


			updateWaitingScreen: function(data){
				//console.log(data);
				$('#playersWaiting').append('<p/>').text('Player '+data);

				Game.Host.players.push(data);
				Game.Host.numPlayers++;

				if(Game.Host.numPlayers == 1){
					//console.log(IO);
					IO.socket.emit('hostGameFull', Game.gameId);
				}
			},

			gameCountDown: function(data){
				Game.$gameArea.html(Game.$hostScreen);

				var $secondsLeft = $('#question');
				Game.countDown($secondsLeft, 5, function(){
					IO.socket.emit('hostCountdownFinished', Game.gameId);
				});
			},


			newQuestion: function(data){
				console.log(data);
				$('#question').text(data.question);
				Game.Host.currentCorrectAnswer = data.correct;
				$('#answer1').text(data.answers[0]);
				$('#answer2').text(data.answers[1]);
				$('#answer3').text(data.answers[2]);
				$('#answer4').text(data.answers[3]);



			}


		},

		//Utilities


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