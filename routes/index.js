var request = require('request');
var messagePrep = require('../messagePrep');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

function updateFront(receivedMessage){
  var options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOlsic2hhcmVkOioiLCJwcml2YXRlOioiXSwiaXNzIjoiZnJvbnQiLCJzdWIiOiJ0cmlhbF9jb21wIn0.fKJEum7rO4kUgVHmchJFvE0PrmQsZHb4vCUfDvXKsIY",
      "Accept": "application/json"
    },
    method: "POST",
    body: JSON.stringify(receivedMessage),
    uri: "https://api2.frontapp.com/channels/cha_bs8d/incoming_messages"
  };
  request(options, function(error, response){
    console.log(error, response);
    return;
  });
}

router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/fromWA', function(req, res){
  var data = req.body;
  for(var i = 0; i < data.messages.length; i++){
    var message = data.messages[i];
    if (message.fromMe == false)  // if the message is not sent by us, i.e. message is received then forward it to front
    {
      var receivedMessage = messagePrep.toFront(message);
      console.log("Received Message\n");
      console.log(receivedMessage);
      updateFront(receivedMessage);
    }
    else {
      console.log("Sent Message\n");
    }
  }
  res.send('Ok');
});

router.post('/toWA', function(req, res){
  var message = req.body;
  console.log("Message sent to WA\n");
  console.log(message);
});

module.exports = router;
