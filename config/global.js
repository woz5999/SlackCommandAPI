var global = {};

switch(process.env.NODE_ENV) {
    case('dev'):
        global = {
            authTokens: {
                'T4ZdouaGsqCxIEUC6ddj50Lv':
                    'xoxp-14577477094-14577477126-14571825524-a14226976c'
            }
        };
        break;

    default:
        global = {
            authTokens: JSON.parse(process.env.authTokens)
        };
        break;
}

module.exports = global;
