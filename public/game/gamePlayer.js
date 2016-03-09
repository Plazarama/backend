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
			IO.socket.on('timeTicked', IO.onTimeTicked);

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
			console.log(data);
			Game.Player.updateWaitingScreen(data);
		},
		onGameFinished: function(data){
			Game.Player.gameFinished(data);
		},

		onTimeTicked: function(data){
			Game.Player.timeTicked(data);
		},

		onError: function(data){
			console.log(data);
		}
	};


	var Game = {
		gameId: 0,
		mySocketId: '',
		dbId: '',

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
				Game.dbId = $('#uid').val();
				var data = {
					gameId: joiningGameId,
					dbId: Game.dbId
				};

				IO.socket.emit('playerJoinGame', data);

			},

			updateWaitingScreen: function(data){
				if(data.mySocketId.indexOf(IO.socket.id) > -1){
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

			timeTicked: function(data){
				console.log(data);
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
						dbId: Game.dbId
				};

				console.log(data);

				IO.socket.emit('playerAnswered', data);

			},

			// gameFinished: function(winner){
			// 	Game.$gameArea.html(Game.$finishedGame);
			//
			// 	if(winner){
			// 		console.log('winner');
			// 		$('#gameResult').text('YOU WIN!! :D');
			// 	}
			// 	else{
			// 		console.log('you lost!');
			// 		$('#gameResult').text('YOU LOST!! :(');
			//
			// 	}
			// }

			gameFinished: function(data){
				Game.$gameArea.html(Game.$finishedGame);
				var html = $.parseHTML('<form id="hiddenForm" action="results" method="POST"></form>');
				Game.$gameArea.html(html);
				var $hiddenForm = Game.$gameArea.children('#hiddenForm');

				console.log(data.result);
				$hiddenForm.append('<input type="hidden" name="first_name" value="' + data.result[0].player.name + '" />');
				$hiddenForm.append('<input type="hidden" name="first_score" value="' + data.result[0].player.score + '" />');
				$hiddenForm.append('<input type="hidden" name="second_name" value="' + data.result[1].player.name + '" />');
				$hiddenForm.append('<input type="hidden" name="second_score" value="' + data.result[1].player.score + '" />');
				if(data.result.length > 2) {
					$hiddenForm.append('<input type="hidden" name="third_name" value="' + data.result[2].player.name + '" />');
					$hiddenForm.append('<input type="hidden" name="third_score" value="' + data.result[2].player.score + '" />');
				}
				else {
					$hiddenForm.append('<input type="hidden" name="third_name" value="N/A" />');
					$hiddenForm.append('<input type="hidden" name="third_score" value="0" />');
				}
				$hiddenForm.append('<input type="hidden" name="loser_name" value="' + data.result[data.result.length - 1].player.name + '" />');
				$hiddenForm.append('<input type="hidden" name="loser_score" value="' + data.result[data.result.length - 1].player.score + '" />');

				data.result.forEach(elem => {
					if(elem.player.mySocketId.indexOf(Game.mySocketId) > -1)
					$hiddenForm.append('<input type="hidden" name="my_score" value="' + elem.player.score + '" />');
				});
				console.log($hiddenForm);
				$hiddenForm.submit();
			}
		}
}



	IO.init();
	Game.init();
});
