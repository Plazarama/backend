var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals = {
  	content: 'users'
  };

  res.render('index');
});

module.exports = router;
