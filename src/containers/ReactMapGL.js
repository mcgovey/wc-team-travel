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
  constructor(props) {
    super(props);

    this.state = {
      object: null
    }
  }
  _onHover(event) {
    console.log('event', event, event.object);
    const { x, y, lngLat, object} = event;
    // console.log('hover', x, y, object);
    // const pickInfo = this.deckGL.pickObject({x: event.clientX, y: event.clientY});
    // console.log(pickInfo.lngLat);
    this.setState({x, y, lngLat, object});
  }
  _renderTooltip() {
    const {x, y, lngLat, object} = this.state;

    console.log('object', object);

    if (!object) {
      return null;
    }

    const lat = lngLat[1];
    const lng = lngLat[0];
    // const count = hoveredObject.points.length;

    return (
      <div className="tooltip"
           style={{left: x, top: y, opacity: 1, backgroundColor: '#ccc', padding: '5px', borderRadius: '5px'}}>
        <div>{`${object.playingTeam} traveled from ${object.fromCity}`}</div>
        <div>{`to ${object.city} to play ${object.opposingTeam}`}</div>
      </div>
    );
  }
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
      onHover: this._onHover.bind(this),
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
    // console.log('WCData', data, activeButton, this.props.arcState);
    return (
      <div>
        {this._renderTooltip()}
        <MapGL
          {...this.props.viewport}
          onViewportChange={(viewport) => {
            const {width, height, latitude, longitude, zoom, mapStyle} = viewport;
            // call `setState` and use the state to update the map.
            this.props.panMap(viewport);
          }}
          mapboxApiAccessToken={TOKEN}>
          <DeckGL 
            ref={deck => { this.deckGL = deck; }} 
            {...this.props.viewport} 
            layers={[
              arcLayer
            ]} 
          />
        </MapGL>
      </div>
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