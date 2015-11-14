var global = {};

switch(process.env.NODE_ENV) {
    case('dev'):
        global = {
            appTokens: {
                'T4ZdouaGsqCxIEUC6ddj50Lv':
                    true
            },

            authTokens: {
                'T4ZdouaGsqCxIEUC6ddj50Lv':
                    'xoxp-14577477094-14577477126-14571825524-a14226976c'
            }
        };
        break;

    default:
        global = {
            appTokens: JSON.parse(process.env.appTokens),
            authTokens: JSON.parse(process.env.authTokens)
        };
        break;
}

module.exports = global;
