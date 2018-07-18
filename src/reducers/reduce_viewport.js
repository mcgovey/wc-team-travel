import Immutable from 'immutable';

export default function viewportReducer(viewportState = null, action) {
  switch(action.type){
    case 'PAN_MAP': {

      const viewport = {
        ...viewportState,
        ...action.payload
      };
      return viewport;
    }
    default: return viewportState;
  }

  return viewportState;
}
