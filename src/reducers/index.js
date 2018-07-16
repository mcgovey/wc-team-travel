import { combineReducers } from 'redux';
import Immutable from 'immutable';
import StylesheetReducer from './reducer_stylesheet';
import UserIntReducer from './reduce_userInt';
import viewportReducer from './reduce_viewport';

const rootReducer = combineReducers({
  mapStyle: StylesheetReducer,
  userInterface: UserIntReducer,
  viewport: viewportReducer
});
console.log('reducers combined');
export default rootReducer;
