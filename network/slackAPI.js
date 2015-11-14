var https = require('https');

var API = {
    sendRequest: function(args, path, callback, response) {
        var options = {
            host: 'slack.com',
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(args)
            }
        };

        //request
        var req = https.request(options, function(res) {
            var data = "";

            res.on("data", function(chunk) {
                data += chunk;
            });

            res.on("end", function() {
                var body = JSON.parse(data);

                if(body && body.ok) {
                    callback(body, response);
                } else {
                    response.status('500');
                    response.json({
                        text: body.error
                    });
                    console.log(body.error);
                }
            });
        });

        //error handler for request
        req.on("error", function(e) {
            response.status(500);
            response.json({
                text: "Server error"
            });
            console.log(e);
        });

        req.write(args);
        req.end();
    }
};

module.exports = API;
