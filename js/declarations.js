const declarations = [];
declarations.push('');
declarations.push('/**');
declarations.push(' * Sends a command to the MazeMasterJS Game Server');
declarations.push(' *');
declarations.push(' * @param {action} action Actions include a command, a direction, and an optional message.');
declarations.push(' */');
declarations.push('declare function sendAction(action: Action): void');

declarations.push('/**');
declarations.push(' * Starts a chain of events');
declarations.push(' *');
declarations.push(' * @param {action} action Actions include a command, a direction, and an optional message.');
declarations.push(' * @param {callback} the function to call after the action is completed');
declarations.push(' */');
declarations.push('declare function startActionChain(action: Action, callback: function): void');

declarations.push('declare const DIRECTIONS = {');
declarations.push('  NONE: 0,');
declarations.push('  NORTH: 1,');
declarations.push('  SOUTH: 2,');
declarations.push('  EAST: 4,');
declarations.push('  WEST: 8,');
declarations.push('  LEFT: 16,');
declarations.push('  RIGHT: 32');
declarations.push('};');

declarations.push('declare const PLAYER_STATES = {');
declarations.push('  NONE: 0,');
declarations.push('  STANDING: 1,');
declarations.push('  SITTING: 2,');
declarations.push('  LYING: 4,');
declarations.push('  STUNNED: 8,');
declarations.push('  BLIND: 16,');
declarations.push('  BURNING: 32,');
declarations.push('  LAMED: 64,');
declarations.push('  BEARTRAPPED: 128,');
declarations.push('  SLOWED: 256,');
declarations.push('  DEAD: 512');
declarations.push('};');

declarations.push('declare const COMMANDS = {');
declarations.push('  NONE: 0,');
declarations.push('  FACE: 1,');
declarations.push('  LISTEN: 2,');
declarations.push('  LOOK: 3,');
declarations.push('  SIT: 4,');
declarations.push('  SNIFF: 5,');
declarations.push('  STAND: 6,');
declarations.push('  TURN: 7,');
declarations.push('  MOVE: 8,');
declarations.push('  JUMP: 9,');
declarations.push('  WAIT: 10,');
declarations.push('  WRITE: 11,');
declarations.push('  QUIT: 12');
declarations.push('};');

// add a couple of aliases for common enums
declarations.push('declare const DIRECTIONS = DIRS;');
declarations.push('declare const CMDS = COMMANDS;');

// eslint-disable-next-line no-unused-vars
const MMJS_EDITOR_LIB = declarations.join('\n');
