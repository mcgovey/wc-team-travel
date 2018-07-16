import Immutable from 'immutable';

export default function UserIntReducer(viewportState = null, action) {
  switch(action.type){
    case 'PAN_MAP': {
      console.log('viewportState', viewportState);
      return action.payload;
    }
    default: return viewportState;
  }

  return viewportState;
}
