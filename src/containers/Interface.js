import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

// import Teams from '../data/teams';
import TeamOptions from '../data/teamDropdownOptions';

import { changeViz } from '../actions/index';

class Interface extends Component {
  constructor(props) {
    super(props);

    // this.buttons = Teams;
    this.selectedOption = '';
  }
  _renderMatches() {
    
    const data = this.props.arcState.layerData;
    console.log('data', data);
    return (
      <div className='card'>
        {data.map((d) => {
          console.log('d', d);
          return (
            <ul key={d.datePlayed} className='list-group list-group-flush' style={style.gameRow}>
              <li className='list-group-item'>
                {`${d.playingTeam}-${d.opposingTeam} in ${d.city}`}
              </li>
            </ul>
          );
        })}
      </div>
    )
  }

  render() {
    const { activeButton } = this.props;
    return (
      <div id='ui' style={ style.ui }>
        <div style={ style.header }>Select a country to view their journey</div>

        <Select
          name="form-field-name"
          value={activeButton}
          onChange={this.props.changeViz}
          options={TeamOptions}
        />
        {/* static color legend: */}
        <div className='container' style={ style.legendBox }>
          <div style={ style.legendGradient }></div>
          <div className='row'>
            <div id='leftTxt' className='col-md-6' style={{ text: 'align-left', paddingRight: '0px' }}>Start of Tourney</div>
            <div id='rightTxt' className='col-md-6' style={{ text: 'align-right', paddingRight: '0px'}}>End</div>
          </div>
        </div>
        {/* <div className='container' style={ style.gameBox }> */}
          {this._renderMatches()}
        {/* </div> */}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeViz: changeViz
  },dispatch);
}
function mapStateToProps(state) {
  return{
    activeButton: state.userInterface.get('activeButton'),
    arcState: state.arcState,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Interface);

const style = {
  ui: {
    zIndex: 2,
    position: 'absolute',
    top: '20px',
    right: '20px',
    borderRadius: '7px',
    width: '230px',
    background: 'white',
    padding: '15px'
  },
  legendBox: {
    zIndex: 2,
    background: 'rgba(200,200,200,.55)',
    height: '55px',
    width: '100%',
    textAlign: 'center',
    padding: '15px',
    borderRadius: '5px',
    fontSize: 'x-small',
    marginTop: '30px'
  },
  gameBox: {
    zIndex: 2,
    background: 'rgba(200,200,200,.55)',
    width: '100%',
    textAlign: 'center',
    padding: '5px',
    borderRadius: '5px',
    fontSize: 'small',
    marginTop: '20px'
  },
  gameRow: {
    margin: '3px',
    textAlign: 'center',
    fontSize: 'small',
    // marginRight: '2px',
  },
  legendGradient: {
    height: '10px',
    width: '100%',
    background: 'linear-gradient(to right, #fff7fb, #023858)',
    borderRadius: '10px',
    marginBottom: '5px'
  },
  header: {
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  reminder: {
    fontSize: 'x-small',
    marginTop: '10px',
    marginLeft: '10px'
  }
};
