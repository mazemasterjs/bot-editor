# bot-editor

MazeMasterJS Bot Editor

## TODO:

[ ] Auto-load any open games when player logs in (once we have a log in feature, anyway)
[ ] Create sign-up / team management page
[ ] Replace janky mini-map with something that looks decent and doesn't suck
[ ] Login page should automatically redirect USER_ROLES.USER level users to bot-editor
[ ] Login page should present menu of other options (score board, team/user/bot management) to assistant+ users
[ ] Add some kind of trophy notification
[ ] Add some kind of new high score (by maze)
[ ] Remove cumulative scoring in action log - go back to per-maze score/move counting
[X] Add login
[X] Add a quit/abort button
[X] Auto-load game when re-attaching
[X] Add support for caching maze, team, and bot lists in local storage, too?
[X] Add support for local credential caching (cookies)
[X] Finish header work (player greeting, etc)

## Change Notes

### v0.9.0

- Intellisense declarations added for logMessage - includes new enum for LOG_TYPES (BOT, WARN, and ERROR)

  - logMessage(LOG_TYPE:LOG_TYPES, msgHeader:string, msgBody?: string): void;');

- **GameData Object** - goBot(data)'s data paramater has been mapped to a goBot() AND editor scopped object called "GameData".

  - GameData and data contain the same information, but GameData hase intellisense and type-ahead enabled to make finding the right elements much easier for the kids
  - GameData should be used in snippets and sample bots going forward

- data (and GameData) structure returned to goBot(data)'s data parameter has changed:
  - data.player.facing - DIRECTIONS.DIRECTION: Direction the player is facing
  - data.player.state - PLAYER_STATES.PLAYER_STATE: Current player state (bitwise)
  - data.player.health - number: Current player's remaining health (100 max)
  - data.room.exitNorth[South | East | West] - boolean - true if exit exists in that direction
  - data.room.messages[] - Array<string> - Player-written messages in the room (via WRITE command)
  - data.see.north[south|east|west] - Array<{sight:<string>, distance<number>> - Array of sights in the specified direction
  - data.hear.north[south|east|west] - Array<{sound:<string>, volume<number>> - Array of sounds in the specified direction
  - data.smell.north[south|east|west] - Array<{smell:<string>, strength<number>> - Array of smells in the specified direction
  - data.feel.north[south|east|west] - Array<{feeling:<string>, intensity<number>> - Array of feelings (touch) in the specified direction
  - data.taste.north[south|east|west] - Array<{taste:<string>, strength<number>> - Array of tastes in the specified direction (rarely used)

### v0.8.0

- Login page added
- Credentials cached in local cookie after successful validation
- Advanced controls (maze, team, bot select) only visible to users with >= assistant role
- Quit .gifs added to taunt those who /quit an active game
- Spiffy new logo added!
- Controls relocated to strategic page positions to maximize available real estate
- All logMessage() types now render embedded html (e.g. <b>, <i>, <img>)
- Started replacing full \$.ajax calls with a simplified wrapper - more work to do on this
- CTRL+S in editor now only saves a new version if there are changes to be saved
- Tooltips no longer get stuck on the screen in certain situations

### v0.7.0

- Bot editor no longer uses eval() to run bots, instead coverting the bot code into a js function calling it
- All bot scripts will now have "use strict"; forcibly injected if it's not found to already be in place
- Reworked all .ajax calls to use promises instead of default callbacks
- Added modal loading dialog
- Run, Step, and Debug bot buttons now auto-disable until the outstanding action / chain is complete
- Reformatted engrams slightly to (hopefully) improve legibility and style
- Reformatted outcomes slightly to (hopefully) improve legibility and style
- work started on login / landing

### v0.6.0

- Win / Lose images displayed in action log when game ends
- Mini-map game-over ascii flare literally forced into not messing up scaling
- Run / Step / Debug flows adjusted to be a little more intuitive (hopefully)
- Action log output is now limited to the past 250 records, configurable via gameFuncs.TEXTLOG_MAX_CHILDREN
- Quit button now abandons a game that is currently in progress.

### v0.5.1

- Updates to support response data changes from game-server
- MiniMap now gets a cool skull text image when game ends
- added a jsonToStr() function that injecst spaces before commas to allow word-wrap
  - in engram output

### v0.5.0

- Updated response rendering for new engrams
- Minimap now shows player-facing direction (after first move)
- Some CSS tweaks for appearance
- Version button now longer disabled after auto-save of current version
- Outcomes now displayed along with action codes and player state

### v0.0.2

- Change to sight engram to be based on direciton
