import Immutable from 'immutable';

export default function viewportReducer(viewportState = null, action) {
  switch(action.type){
    case 'PAN_MAP': {
      console.log('viewportState', viewportState);

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
