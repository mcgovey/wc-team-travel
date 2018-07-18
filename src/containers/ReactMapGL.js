import React, { PureComponent } from 'react';
import DeckGL, { ArcLayer } from 'deck.gl';
import MapGL from 'react-map-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { interpolateRgb } from 'd3-interpolate';

import {MapboxAccessToken} from '../tokens/mapbox';

import { panMap, selectGameArc } from '../actions/index';
  
const TOKEN = MapboxAccessToken;

class ReactMapGL extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      object: null
    }
  }
  _onHover(event) {
    //onHover only affects state on this component
    const { x, y, lngLat, object} = event;
    this.setState({x, y, lngLat, object});
  }
  _renderTooltip() {
    const {x, y, lngLat, object} = this.state;

    if (!object) {
      return null;
    }

    const lat = lngLat[1];
    const lng = lngLat[0];

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
    const activeGame = this.props.gameSelect.get('activeGame');
    const data = this.props.arcState.layerData;
    const colorInterpolator = interpolateRgb('#ffffe5','#8c2d04');
    const getColor = (d, a) => {
      if (+d.datePlayed===+activeGame) {
        return [0, 63, 55, 250];
      } else {
        const colorArr = colorInterpolator(d.daysFromStart/31).replace(/[^\d,.]/g, '').split(',').map((d) => +d);
        colorArr.push(a);
        return colorArr;
      }
      
    };
    const arcLayer = new ArcLayer({
      id: 'arc-layer',
      data,
      pickable: true,
      onHover: this._onHover.bind(this),
      onClick: this.props.selectGameArc,
      getStrokeWidth: 12,
      getSourcePosition: d => d.fromCoords,
      getTargetPosition: d => d.toCoords,
      highlightColor: [63, 20, 1, 250],
      autoHighlight: true,
      getSourceColor: d => getColor(d, 120),
      getTargetColor: d => getColor(d, 255),
      updateTriggers: {
        getSourceColor: [activeButton, activeGame],
        getTargetColor: [activeButton, activeGame],
      },
    });
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
    selectGameArc: selectGameArc,
	}, dispatch);
  }
function mapStateToProps(state) {
	return {
    viewport: state.viewport,
    userInterface: state.userInterface,
    arcState: state.arcState,
    gameSelect: state.gameSelect,
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ReactMapGL);