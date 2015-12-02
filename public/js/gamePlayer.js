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
			IO.socket.on('newQuestion', IO.onNewQuestion);


			IO.socket.on('playerJoined', IO.onPlayerJoined);
		},

		/*
		 * The client is connected
		 */
		onConnected: function(data) {
			console.log(data);
			Game.mySocketId = IO.socket.id;
		},

		onNewQuestion: function(data) {
			console.log(data);
		},

		onPlayerJoined: function(data) {
			Game.Player.updateWaitingScreen(data);
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

		},

		showInitScreen: function(){
			Game.$gameArea.html(Game.$initScreen);
		},


		bindEvents: function(){
			Game.$doc.on('click', '#btnJoinGame', Game.Player.onJoinClick);
            Game.$doc.on('click', '#btnStart', Game.Player.onPlayerStartClick);
		},


		

		Player: {
			hostSocketId: '',


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

			}
		}


	};


	IO.init();
	Game.init();
});