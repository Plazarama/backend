/**
 * This function is called by app.js to connect to the db.
 *
 * @param mongoose the mongoose object
 */
exports.connect = function(mongoose){
	
		var uristring = 
		  process.env.MONGOLAB_URI || 
		  process.env.MONGOHQ_URL || 
		  'mongodb://localhost/p300';

		mongoose.connect(uristring, function(err, res){
			if(err){
				console.log('ERROR: connecting to database. '+err);
			}
			else
				console.log('Connected to Database.');
		});
};