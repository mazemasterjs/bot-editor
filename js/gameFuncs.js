const BASE_HOST = 'http://mazemasterjs.com';
//const BASE_HOST = 'http://localhost:8080';
const GAME_URL = 'http://localhost:8080/game';
const MAZE_URL = BASE_HOST + '/api/maze';
const TEAM_URL = BASE_HOST + '/api/team';

let curGame;
let lastAction;

function loadMazes() {
    console.log('Loading maze list...');
    $.getJSON(MAZE_URL + '/get', (mazes) => {
        for (const maze of mazes) {
            let opt = "<option value='" + maze.id + "'>";
            opt += maze.name + ' (' + maze.height + ' x ' + maze.width + ')';
            opt += '</option>';
            $('#selMaze').append(opt);
        }
    });
}

function loadTeams() {
    console.log('Loading teams list...');
    $.getJSON(TEAM_URL + '/get', (data) => {
        teams = data;
        for (const team of teams) {
            let opt = "<option value='" + team.id + "'>";
            opt += team.name;
            opt += '</option>';
            $('#selTeam').append(opt);
        }

        $('#selBot').empty();
        for (const bot of teams[0].bots) {
            let botSel = "<option value='" + bot.id + "'>";
            botSel += bot.name + ' (' + bot.coder + ')';
            botSel += '</option>';
            $('#selBot').append(botSel);
        }
    });
}

function loadBots(teamId) {
    console.log('Loading bots for team ' + teamId);
    if (!teams || !teamId) return;

    $.getJSON(TEAM_URL + '/get?id=' + teamId, (data) => {
        team = data[0];
        $('#selBot').empty();
        for (const bot of team.bots) {
            let botSel = "<option value='" + bot.id + "'>";
            botSel += bot.name + ' (' + bot.coder + ')';
            botSel += '</option>';
            $('#selBot').append(botSel);
        }
    });
}

function loadControls() {
    loadMazes();
    loadTeams();

    $('#selTeam').change(function() {
        loadBots($('#selTeam option:selected').val());
    });
}

function logMessage(message) {
    // $('#outcomeContent').append('<div>' + message + '</div>');
    $('#textLog').prepend('<div class="logMessage">' + message + '</div>');
}

function logError(message) {
    $('#textLog').append('<div class="errMessage">' + message + '</div>');
}

function startGame() {
    $('#textLog').empty();
    logMessage('Starting game...');

    const mazeId = $('#selMaze').val();
    const teamId = $('#selTeam').val();
    const botId = $('#selBot :selected').val();
    const url = GAME_URL + '/new/' + mazeId + '/' + teamId + '/' + botId + '?forceId=FORCED_JD_EDITOR_002';

    $.ajax({
        url: url,
        method: 'PUT', // method is any HTTP method
        data: {}, // data as js object
        success: function(data) {
            console.log('success');
            logMessage(JSON.stringify(data));
        },
        error: function(error) {
            console.log('error');
            logError('Error: ' + error.responseJSON.message);
        }
    });
}

async function sendAction(gameId, command, direction, message) {
    const url = GAME_URL + '/action';
    return await $.ajax({
        url: url,
        method: 'PUT', // method is any HTTP method
        dataType: 'json',
        data: {
            gameId: gameId,
            command: command,
            direction: direction,
            message: message
        }, // data as js object
        success: function(data) {
            //console.log('Success: ' + JSON.stringify(data));
            for (const outcome of data.outcomes) {
                logMessage('<pre>' + outcome + '</pre>');
            }
            return Promise.resolve(data);
        },
        error: function(error) {
            console.log('Error: ' + JSON.stringify(error));
            logError('Error: ' + error.responseJSON.message);
        }
    });
}
