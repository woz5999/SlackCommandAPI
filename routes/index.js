var express = require('express');
var Global = require('../global');
var search = require('../commands/search');

var router = express.Router();

router.post('/*', function(req, res) {
    var response = '';
    var arg = req.query.text;

    //validate token
    if(req.query.token === Global.authToken) {
        switch(req.query.command) {
            case '/search':
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
