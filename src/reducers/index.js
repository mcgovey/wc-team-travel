import { combineReducers } from 'redux';
import Immutable from 'immutable';
import StylesheetReducer from './reducer_stylesheet';
import UserIntReducer from './reduce_userInt';
import viewportReducer from './reduce_viewport';
import ArcReducer from './reduce_arcs';
import GameSelectReducer from './reduce_gameSelect';

const rootReducer = combineReducers({
  mapStyle: StylesheetReducer,
  userInterface: UserIntReducer,
  arcState: ArcReducer,
  viewport: viewportReducer,
  gameSelect: GameSelectReducer,
});
console.log('reducers combined');
export default rootReducer;
