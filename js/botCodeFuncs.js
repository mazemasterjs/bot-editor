const BASE_HOST = 'http://mazemasterjs.com';
//const BASE_HOST = 'http://localhost:8080';
const GAME_URL = 'http://localhost:8080/game';
const MAZE_URL = BASE_HOST + '/api/maze';
const TEAM_URL = BASE_HOST + '/api/team';

function startGame() {
    prepend('Starting game...');

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
