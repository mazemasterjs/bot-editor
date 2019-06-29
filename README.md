# bot-editor

MazeMasterJS Bot Editor

## TODO:

[ ] Need to add some kind of infinite loop detection - longer mazes will run for a very long time...
[ ] Throttle callback responses with a timeout?  
[ ] Adjust timeout values on ajax calls
[ ] Auto-load any open games when player logs in (once we have a log in feature, anyway)
[ ] Auto-load game when re-attaching
[ ] Add a quit/abort button

## Change Notes

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
