export const error = {
  REQUIRED_TEAM_DATA: new Error(
    'Failed to insert data ! User need to insert all details'
  ),
  GAME_ID_IS_EXIST: new Error(
    'Failed to insert data ! the game id is already there'
  ),
  INVALID_GAME_ID: new Error(
    'Failed to operation on game data ! the game id may provided wrong'
  ),
};
