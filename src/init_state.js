import Immutable from 'immutable';
import WCData from './data/wctravel';
import createArcs from './utilities/arcs';

function hydrate(usePrevious = null) {
  if(!usePrevious){
    let wcData = createArcs(WCData, 'France');
    console.log('all layers', wcData);
    return {
      mapStyle: null,
      userInterface: Immutable.fromJS({
        activeButton: 'France',
        // layerData: createArcs(WCData, 'ALL'),
        activeLayer: 'buildings',
        popup: null,
      }),
      arcState: {
        layerData: wcData
      },
      viewport: {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        longitude: 39.75333084153488,
        latitude: 54.596073529047466,
        zoom: 3,
        pitch: 40,
        bearing: 3,
        mapStyle: 'mapbox://styles/mcgovey/cjit8fr292wii2ro7si58jldi'
      }
    };
  }
}

const InitialState = hydrate();
export default InitialState;
