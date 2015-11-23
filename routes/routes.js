module.exports = function(app){

	app.route('/')

		.get(function(req, res){
			res.render('index', {title: 'EJS Template'});
		});


	app.route('/about')
		.get(function(req, res){
			res.render('about', {title: 'About page'});
		});
};