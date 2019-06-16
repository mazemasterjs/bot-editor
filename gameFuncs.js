const TROPHY_IDS = {
    CHEDDAR_DINNER: 0,
    DAZED_AND_CONFUSED: 1,
    DOUBLE_BACKER: 2,
    FLAWLESS_VICTORY: 3,
    JUMPING_JACK_FLASH: 4,
    KICKING_UP_DUST: 5,
    LIGHT_AT_THE_END: 6,
    LOOPER: 7,
    MIGHTY_MOUSE: 8,
    NERVOUS_WALK: 9,
    OUT_OF_MOVES: 10,
    PAPERBACK_WRITER: 11,
    SCRIBBLER: 12,
    SHORTCUTTER: 13,
    SPINNING_YOUR_WHEELS: 14,
    TAKING_A_STAND: 15,
    STANDING_AROUND: 16,
    THE_LONGER_WAY_HOME: 17,
    THE_LONGEST_WAY_HOME: 18,
    THE_LONG_WAY_HOME: 19,
    TOO_HOT_TO_HANDLE: 20,
    WASTED_TIME: 21,
    WATCHING_PAINT_DRY: 22,
    WISHFUL_DYING: 23,
    WISHFUL_THINKING: 24,
    YOU_FELL_FOR_IT: 25,
    YOU_FOUGHT_THE_WALL: 26
};
const PLAYER_STATES = {
    NONE: 0,
    STANDING: 1,
    SITTING: 2,
    LYING: 4,
    STUNNED: 8,
    BLIND: 16,
    BURNING: 32,
    LAMED: 64,
    BEARTRAPPED: 128,
    SLOWED: 256,
    DEAD: 512
};
const DIRS = {
    NONE: 0,
    NORTH: 1,
    SOUTH: 2,
    EAST: 4,
    WEST: 8
};
const CELL_TAGS = {
    NONE: 0,
    START: 1,
    FINISH: 2,
    PATH: 4,
    CARVED: 8,
    LAVA: 16
};
const CELL_TRAPS = {
    NONE: 0,
    PIT: 1,
    BEARTRAP: 2,
    TARPIT: 4,
    FLAMETHOWER: 8
};
const COMMANDS = {
    NONE: 0,
    LOOK: 1,
    SIT: 2,
    STAND: 3,
    MOVE: 4,
    JUMP: 5,
    WRITE: 6,
    QUIT: 7
};
const GAME_RESULTS = {
    NONE: 0,
    IN_PROGRESS: 1,
    OUT_OF_MOVES: 2,
    OUT_OF_TIME: 3,
    DEATH_TRAP: 4,
    DEATH_POISON: 5,
    DEATH_LAVA: 6,
    WIN: 7,
    WIN_FLAWLESS: 8,
    ABANDONED: 9
};
const GAME_STATES = {
    NEW: 0,
    IN_PROGRESS: 1,
    FINISHED: 2,
    ABORTED: 3,
    ERROR: 4
};
const GAME_MODES = {
    NONE: 0,
    SINGLE_PLAYER: 1,
    MULTI_PLAYER: 2
};

const baseUrl = 'http://mazemasterjs.com/game';
let curGame;
let lastAction;

function loadMazes() {
    console.log('Loading maze list...');
    $.getJSON('http://mazemasterjs.com/api/maze/get', (mazes) => {
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
    $.getJSON('http://mazemasterjs.com/api/team/get', (data) => {
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

    $.getJSON('http://mazemasterjs.com/api/team/get?id=' + teamId, (data) => {
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

function appendOutcome(message) {
    $('#outcomeContent').append('<div>' + message + '</div>');
}

function appendError(message) {
    $('#outcomeContent').append('<div class="error">' + message + '</div>');
}

function startGame() {
    $('#outcomeContent').empty();
    appendOutcome('Starting game...');

    const mazeId = $('#selMaze').val();
    const teamId = $('#selTeam').val();
    const botId = $('#selBot :selected').val();
    const url = baseUrl + '/new/' + mazeId + '/' + teamId + '/' + botId + '?forceId=JD_EDITOR_002';

    $.ajax({
        url: url,
        method: 'PUT', // method is any HTTP method
        data: {}, // data as js object
        success: function(data) {
            console.log('success');
            appendOutcome(JSON.stringify(data));
        },
        error: function(error) {
            console.log('error');
            appendError('Error: ' + error.responseJSON.message);
        }
    });
}

function sendAction(gameId, command, direction, message) {
    const url = baseUrl + '/action';
    $.ajax({
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
            console.log('Success: ' + JSON.stringify(data));
            for (const outcome of data.outcomes) {
                appendOutcome('<pre>' + outcome + '</pre>');
            }
        },
        error: function(error) {
            console.log('Error: ' + JSON.stringify(error));
            appendError('Error: ' + error.responseJSON.message);
        }
    });
}
