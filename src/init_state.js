import Immutable from 'immutable';

function hydrate(usePrevious = null) {
  if(!usePrevious){
    return {
      mapStyle: null,
      userInterface: Immutable.fromJS({
        activeButton: 'age',
        activeLayer: 'buildings',
        popup: null
      }),
      viewport: {
        width: 500,
        height: 500,
        longitude: 39.75333084153488,
        latitude: 54.596073529047466,
        zoom: 3,
        pitch: 40,
        bearing: 3,
      }
    };
  }
}

const InitialState = hydrate();
export default InitialState;
