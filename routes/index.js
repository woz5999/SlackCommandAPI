var express = require('express');
var Global = require('../config/global');
var search = require('../commands/search');

var router = express.Router();

router.get('/*', function(req, res) {
    //validate token
    var appToken = req.query.token;
    var authToken = Global.authTokens[appToken];

    if(appToken && authToken) {
        //route commands
        switch(req.query.command) {
            case '/searchin':
                search(req.query.text, res, authToken);
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
            text: 'Invalid app token'
        });
    }
});

router.post('/*', function(req, res) {
    res.status('405');
    res.json({
        text: 'Method not allowed'
    });
});

module.exports = router;
