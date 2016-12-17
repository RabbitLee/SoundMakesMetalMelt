/**
 * Created by RabbitLee on 16/12/2016.
 */

var express = require('express');
var router = express.Router();

var voice_time = 0;

router.get('/', function (req, res, next) {
    res.sendStatus(200);
})

router.get('/write', function(req, res, next) {
    voice_time = req.query.voice_time;
    res.sendStatus(200);
});

router.get('/read', function (req, res, next) {
    res.send({'heat_time': voice_time});
    voice_time = 0;
})

module.exports = router;
