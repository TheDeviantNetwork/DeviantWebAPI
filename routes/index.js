var express = require('express');
var mcping = require('mc-ping');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("You shouldn't be here!")
});


router.get('/status', function(req, res, next) {
    mcping('s1.thedeviantnetwork.com', 25565, function(err, response) {
        if (err) {
            // Some kind of error
            console.error(err);
        } else {
            res.json(response);
            console.log(response);
        }
    }, 3000);
});

module.exports = router;
