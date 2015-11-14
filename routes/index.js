var express = require('express');
var Global = require('../global');
var search = require('../commands/search');

var router = express.Router();

router.post('/*', function(req, res) {
    var response = '';
    var arg = req.body.text;
console.log(req.body); //TODO delete
console.log(req.body.token); //TODO delete
    //validate token
    if(req.body.token === Global.authToken) {
        switch(req.body.command) {
            case '/searchin':
                response = search(arg, res);
                break;

            default:
            res.status('500');
            res.json({
                text: 'Unknown command'
            });
        }
    } else {
        res.status('403');
        res.json({
            text: 'Invalid token'
        });
    }
});

module.exports = router;
