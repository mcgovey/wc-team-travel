import Immutable from 'immutable';
import createArcs from '../utilities/arcs';

import WCData from '../data/wctravel';

export default function arcDataReducer(arcState = null, action) {
  console.log('arcState', arcState);
  switch(action.type){
    case 'CHANGE_VIZ': {
      const layerData = createArcs(WCData, action.payload);
      return { layerData };
    }
    
    default: return arcState;
  }

  return arcState;
}
