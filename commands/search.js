var slackAPI = require('../network/slackAPI');
var Global = require('../config/global');
var querystring = require('querystring');

//search command
var search = {
    search: function(query, res, authToken) {
        var path = '/api/search.all';
        var args = querystring.stringify({
            token: authToken,
            query: query,
            sort: 'timestamp'
        });

        slackAPI.sendRequest(args, path, search.parseResults, res);
    },

    parseResults: function(body, res) {
        var results = [];

        res.status('200');

        if(body.messages.matches) {
            var matches = body.messages.matches;

            for(var key in matches) {
                var match = matches[key];

                if(match && match.type == 'message') {
                    var arrMarkdown = ['text'];

                    var item = {
                        title: match.username,
                        title_link: match.permalink,
                        text: match.text
                    };

                    if(matches[key].channel) {
                        item.pretext = '*Channel:* ' + match.channel.name;
                        arrMarkdown.push('pretext');
                    }

                    item.mrkdwn_in = arrMarkdown;

                    results.push(item);
                }
            }
        }//end check matches if

        if(results && results.length > 0) {
            res.json({
                text: 'Search results',
                attachments: results
            });
        } else {
            res.json({
                text: 'No results'
            });
        }

        return;
    }
};

module.exports = search.search;
