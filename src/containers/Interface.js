import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import TeamOptions from '../data/teamDropdownOptions';

import { changeViz, selectGame } from '../actions/index';

class Interface extends Component {
  constructor(props) {
    super(props);

    this.selectedOption = '';
  }
  _renderMatches() {
    
    const data = this.props.arcState.layerData;
    const { activeGame } = this.props;
    return (
      <div className='card' style={ style.gameBox }>
        {data.map((d) => {
          return (
            <ul 
              key={d.datePlayed} 
              className='list-group list-group-flush' 
              style={style.gameRow}
            >
              <li 
                className={'list-group-item' + (+d.datePlayed===+activeGame ? ' active' : '')} 
                data-id={d.datePlayed} 
                onClick={this.props.selectGame}
                style={style.gameLi}
              >
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
        
        <div style={ style.header }>Select a match to highlight</div>
        {this._renderMatches()}
        {/* static color legend: */}
        
        <div style={ style.header }>Date Game Played Legend</div>
        <div className='card'>
          <div className='container' style={ style.legendBox }>
            <div style={ style.legendGradient }></div>
            <div className='row'>
              <div id='leftTxt' className='col-md-6' style={{ text: 'align-left', paddingRight: '0px' }}>Start of Tourney</div>
              <div id='rightTxt' className='col-md-6' style={{ text: 'align-right', paddingRight: '0px'}}>End</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeViz: changeViz,
    selectGame: selectGame,
  },dispatch);
}
function mapStateToProps(state) {
  return{
    activeButton: state.userInterface.get('activeButton'),
    activeGame: state.gameSelect.get('activeGame'),
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
    height: '55px',
    width: '100%',
    textAlign: 'center',
    // padding: '15px',
    borderRadius: '5px',
    fontSize: 'x-small',
    // marginTop: '10px'
  },
  gameBox: {
    marginTop: '10px'
  },
  gameRow: {
    margin: '3px',
    textAlign: 'center',
    fontSize: 'small',
    cursor: 'pointer',
  },
  legendGradient: {
    height: '10px',
    width: '100%',
    background: 'linear-gradient(to right, #ffffe5, #8c2d04)',
    borderRadius: '10px',
    marginBottom: '5px'
  },
  header: {
    marginBottom: '5px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '10px'
  },
  reminder: {
    fontSize: 'x-small',
    marginTop: '10px',
    marginLeft: '10px'
  },
  gameLi: {
    zIndex: 'initial',
  }
};
