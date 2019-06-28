const CALLBACK_DELAY = 50;
let EMERGENCY_STOP_BUTTON_PUSHED = false;

/**
 * Sends a command to the MazeMasterJS Game Server
 *
 * @param {action} action Actions include a command, a direction, and an optional message.
 */
async function sendAction(action) {
  console.log(`Sending action to game #${curGame.gameId}. Action: ${JSON.stringify(action)}`);

  if (!action) {
    const err = new Error('Missing Action - You must supply an action object.');
    logMessage('err', 'Invalid Action', err.message);
    return Promise.reject(err);
  }

  if (!action.command) {
    let err = new Error('Missing action.command - Your action must include a command.');
    logMessage('err', 'Missing action.command', err.message);
    return Promise.reject(err);
  }

  if (!curGame.gameId || curGame.gameId.trim() === '') {
    let err = new Error('Invalid Game - sendAction() requires an a valid gameId.');
    logMessage('err', 'Invalid Game', err.message);
    return Promise.reject(err);
  } else {
    action.gameId = curGame.gameId;
  }

  return await executeAction(action)
    .then(data => {
      // console.log('BotAction.sendAction() -> gameFuncs.executeAction Response: ' + JSON.stringify(data));
      return Promise.resolve(data);
    })
    .catch(error => {
      // console.log('BotAtion.sendAction() -> gameFuncs.executeAction Error: ' + JSON.stringify(error));
      return Promise.reject(error);
    });
}

/**
 * Sends a command to the MazeMasterJS Game Server
 *
 * @param {action} action Actions include a command, a direction, and an optional message.
 * @param {action} callback The function to call back to with response data.
 */
async function startActionChain(action, callback) {
  console.log(`Sending action to game #${curGame.gameId}. Action: ${JSON.stringify(action)}`);

  if (!action) {
    const actErr = new Error('Missing Action - You must supply an action object.');
    logMessage('err', 'Invalid Action', actErr.message);
    throw actErr;
  }

  if (!action.command) {
    let cmdErr = new Error('Missing action.command - Your action must include a command.');
    logMessage('err', 'Missing action.command', cmdErr.message);
    throw cmdErr;
  }

  // if (!callback) {
  //   let cbErr = new Error('Missing callback - startActionChain() requires a callback function.');
  //   logMessage('err', 'Missing callback', cbErr.message);
  //   throw cbErr;
  // }

  if (!curGame || !curGame.gameId || curGame.gameId.trim() === '') {
    let gameIdErr = new Error('Invalid Game - No game is currently in progress.');
    logMessage('err', 'Invalid Game', gameIdErr.message);
    throw gameIdErr;
  } else {
    action.gameId = curGame.gameId;
  }

  return await executeAction(action)
    .then(data => {
      // console.log('BotAction.startActionChain() -> gameFuncs.executeAction Response: ' + JSON.stringify(data));
      setTimeout(() => {
        if (EMERGENCY_STOP_BUTTON_PUSHED) {
          $('#emergencyStopDialog').html(`<img src="images/${Math.floor(Math.random() * 12)}.gif" style="width:100%; min-height:100px" />`);
          $('#emergencyStopDialog').dialog('open');
          logMessage('err', 'EMERGENCY STOP');
          return;
        } else {
          callback(data);
        }
      }, CALLBACK_DELAY);
    })
    .catch(gameNotFoundErr => {
      if (gameNotFoundErr.status === 404) {
        logMessage('err', 'Game Not Found', `Game ${curGame.gameId} was not found. Please start a new game and try again.`);
        throw gameNotFoundErr;
      } else {
        console.log('BotAtion.startActionChain() -> gameFuncs.executeAction Error: ' + JSON.stringify(gameNotFoundErr));
        setTimeout(() => {
          if (EMERGENCY_STOP_BUTTON_PUSHED) {
            return;
          } else {
            callback(gameNotFoundErr);
          }
        }, CALLBACK_DELAY);
      }
    });
}
