import React, { PureComponent } from 'react';
import DeckGL, {LineLayer, ArcLayer} from 'deck.gl';
import MapGL from 'react-map-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {MapboxAccessToken} from '../tokens/mapbox';

import { panMap } from '../actions/index';

import WCData from '../data/wctravel';

// Viewport settings that is shared between mapbox and deck.gl
// const 

let data = WCData.filter((d) => d.fromLat);
data = data.map(d => {
  let rD = d;
  rD.fromCoords = JSON.parse(d.fromCoords);
  rD.toCoords = JSON.parse(d.toCoords);
  return rD;
});
  
const TOKEN = MapboxAccessToken;
// Data to be used by the LineLayer
// const data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];

class ReactMapGL extends PureComponent {
  // state: {
  // }
	render() {
    // const lineLayer = new LineLayer({id: 'line-layer', data});
    console.log('WCData', WCData, data);
    const arcLayer = new ArcLayer({
      id: 'arc-layer',
      data,
      pickable: true,
      getStrokeWidth: 12,
      getSourcePosition: d => d.fromCoords,
      getTargetPosition: d => d.toCoords,
      // getSourceColor: d => [Math.sqrt(d.inbound), 140, 0],
      // getTargetColor: d => [Math.sqrt(d.outbound), 140, 0],
      // onHover: ({object}) => setTooltip(`${object.from.name} to ${object.to.name}`)
    });
    return (

      <MapGL
        {...this.props.viewport}
        onViewportChange={(viewport) => {
          const {width, height, latitude, longitude, zoom} = viewport;
          // call `setState` and use the state to update the map.
          this.props.panMap(viewport);
        }}
        mapboxApiAccessToken={TOKEN}>
				<DeckGL {...this.props.viewport} layers={[
          arcLayer
				]} />
		  </MapGL>
		)
	}
}


// export default ReactMapGL;
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
    panMap: panMap,
	}, dispatch);
  }
function mapStateToProps(state) {
	return {
    viewport: state.viewport,
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ReactMapGL);