import Immutable from 'immutable';

export default function GameSelectReducer(gameSelectState = null, action) {
  switch(action.type){
    case 'CHANGE_VIZ': {
      return gameSelectState.set('activeGame', null);
    }
    
    case 'SELECT_GAME': {
      return gameSelectState.set('activeGame', action.payload);
    }
    default: return gameSelectState;
  }

  return gameSelectState;
}
