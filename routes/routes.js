module.exports = function(app){

	app.route('/')
	
		.get(function(req, res){
			res.render('index', {title: 'Index'});
		});


	app.route('/about')
		.get(function(req, res){
			res.render('about', {title: 'About page'});
		});
};