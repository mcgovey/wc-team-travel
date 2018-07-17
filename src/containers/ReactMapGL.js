import React, { PureComponent } from 'react';
import DeckGL, { ArcLayer } from 'deck.gl';
import MapGL from 'react-map-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { interpolateRgb } from 'd3-interpolate';

import {MapboxAccessToken} from '../tokens/mapbox';

import { panMap } from '../actions/index';

// import WCData from '../data/wctravel';
  
const TOKEN = MapboxAccessToken;
// Data to be used by the LineLayer

class ReactMapGL extends PureComponent {
	render() {
    const activeButton = this.props.userInterface.get('activeButton');
    const data = this.props.arcState.layerData;
    const colorInterpolator = interpolateRgb('#fff7fb','#023858');
    // console.log('colorInterpolator', colorInterpolator);
    const getColor = (d) => {
      return colorInterpolator(d.daysFromStart/31).replace(/[^\d,.]/g, '').split(',').map((d) => +d);
    };
    const arcLayer = new ArcLayer({
      id: 'arc-layer',
      data,
      pickable: true,
      getStrokeWidth: 12,
      getSourcePosition: d => d.fromCoords,
      getTargetPosition: d => d.toCoords,
      highlightColor: [0, 0, 140, 200],
      autoHighlight: true,
      getSourceColor: d => getColor(d),
      getTargetColor: d => getColor(d),
      updateTriggers: {
        getSourceColor: [activeButton],
        getTargetColor: [activeButton],
      },
      // onHover: ({object}) => setTooltip(`${object.from.name} to ${object.to.name}`)
    });
    
    console.log('WCData', data, activeButton, this.props.arcState);
    return (

      <MapGL
        {...this.props.viewport}
        onViewportChange={(viewport) => {
          const {width, height, latitude, longitude, zoom, mapStyle} = viewport;
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
    userInterface: state.userInterface,
    arcState: state.arcState,
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ReactMapGL);