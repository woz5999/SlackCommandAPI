#Slack API Commands

This is a small NodeJS server for handling Slack commands. It's specifically
designed to act as an intermediary for accessing the Slack Web API via slash
commands. For example, current functionality allows a user to search their
Slack history via Slash command instead of the native search function. It was
written for a colleague who needed search results that were easily
copy/pasteable.

###Running the server
To start the server, run:

    npm install
    npm start

###Setup and authentication
App and Auth tokens are handled via environment variables. The
`authTokens` variable should contain a stringified hash of accepted app tokens
along with the corresponding user auth token for accessing the Slack API. The
app token is used by the server to authenticate incoming requests. The auth
token is used by the server to authenticate with the Slack Web API on behalf 
of the user.

Example:
`authTokens`: `{"T4ZdouaGsqCxIEUC6ddj50Lv":
"xoxp-14577477094-14577477126-14571825524-a14226976c"}`

###Adding additional commands
To extend this server with additional commands, create a module containing the
command's code in `./commands/`, add an entry to the switch statement in
`./routes/index.js`, and add an import for the new module in
`./routes/index.js`.