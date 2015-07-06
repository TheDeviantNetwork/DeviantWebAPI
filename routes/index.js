var express = require('express');
var mcping = require('mc-ping');
var EventEmitter = require('events').EventEmitter
var router = express.Router();


var eventBus = new EventEmitter()
eventBus.setMaxListeners(150)
var lastStatus = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("You shouldn't be here!")
});

function checkServer(){
    mcping('s1.thedeviantnetwork.com', 25565, function(err, response) {
        if (err) {
            // Some kind of error
            console.error(err);
        } else {
            if (response != null && lastStatus != null && response["num_players"] != lastStatus["num_players"])
                eventBus.emit('status', response);
            lastStatus = response
        }
    }, 3000);
}

setInterval(checkServer, 5000)

function returnJson(res,data){
    res.header('Access-Control-Allow-Origin', '*');
    res.json(data)
}

router.get('/status', function(req, res, next) {
    if (req.param("poll")) {
        eventBus.once('status', function (data) {
            returnJson(res, data)
        });
    }else
        returnJson(res, lastStatus)
});


module.exports = router;
