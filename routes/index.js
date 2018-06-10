var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res){
  var data = req.body;
  for(var i = 0; i < data.messages.length; i++){
    var message = data.messages[i];
    console.log(message.author + ": " + message.body);
  }
  res.send('Ok');
});

module.exports = router;
