/*  This file contains functions that are used to modify the message
    coming from the chat-api to the frontapp and from the frontapp to the chat-api */

/*  messageFromWA is in the following JSON format
    {
  
        "messages:" [{
            "id": "false_79500281111@c.us_DF38E6A25B42CC8CCE57EC40F",
            "body": "Окей.",
            "type": "chat",
            "senderName": "Ilya",
            "fromMe": true,
            "author": "79500281111@c.us",
            "time": 1504208593,
            "chatId": "79500281111@c.us",
            "messageNumber": 100
        }, {
        }]
    }
*/

/* receivedMessage by frontapp is in the following JSON format
    {
        "sender": {
            "contact_id": "",   // optional
            "name": "",         // optional
            "handle": ""
        },
        "subject": "",          // optional
        "body": "",
        "body_format": "",      // optional
        "attachments": [],      // optional
        "metadata": {           // optional
            "thread_ref": "",
            "headers": {}
        }          
    }
*/

function sender(name, handle){
    this.name = name;
    this.handle = handle;
}

function receivedFrontMessage(sender, body){
    this.sender = sender;
    this.body = body;
}

// contacts = {};      // used to store contacts. Phone number are keys

exports.toFront = function(messageFromWA){
    var thisSender = new sender(messageFromWA.senderName, messageFromWA.chatId);
    var receivedMessage = new receivedFrontMessage(thisSender, messageFromWA.body);
    return receivedMessage;
}

