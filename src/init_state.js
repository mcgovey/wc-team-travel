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
        longitude: 30.220533,
        latitude: 59.972953,
        zoom: 6,
        pitch: 5,
        bearing: 3,
      }
    };
  }
}

const InitialState = hydrate();
export default InitialState;
