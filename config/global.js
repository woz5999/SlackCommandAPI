var global = {};

switch(process.env.NODE_ENV) {
    case('dev'):
        var authToken = require('./authToken');
        global = {
            authTokens: authToken
        };
        break;

    default:
        global = {
            authTokens: JSON.parse(process.env.authTokens)
        };
        break;
}

module.exports = global;
