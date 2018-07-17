import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Teams from '../data/teams';

import { changeViz } from '../actions/index';

class InterfaceDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: ''
    }
    this.buttons = Teams;
  }

  // // Makes a button that triggers the CHANGE_VIZ action
  // // with a provided value.
  // _makeButton(activeState, btnData) {
  //   const { value, contents } = btnData;
  //   const className = activeState === value ? 'btn btn-default active' : 'btn btn-default';

  //   return (
  //     <button
  //       value={ value }
  //       type='button'
  //       className={ className }
  //       onClick={ this.props.changeViz }
  //       key={ value }>
  //       { contents }
  //     </button>
  //   );
  // }  
  handleChange(selectedOption) {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  }

  render() {
    // const { activeButton } = this.props;

    // console.log('print teams', Teams);
    // make all the buttons:
    // const buttons = this.buttons.map(btn => this._makeButton(activeButton, btn));
    const { selectedOption } = this.state.selectedOption;

    return (
      <div id='ui'>
        <div>Select a metric to view:</div>
        

        <Select
          name="form-field-name"
          value={selectedOption}
          onChange={this.handleChange}
          options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
          ]}
        />
        {/* <div className="btn-group-vertical" role="group" aria-label="..." style={{ width: '100%' }}>
          { buttons }
        </div>
        <div className='container' style={ style.legendBox }>
          <div style={ style.legendGradient }></div>
          <div className='row'>
            <div id='leftTxt' className='col-md-6' style={{ text: 'align-left'}}>Low</div>
            <div id='rightTxt' className='col-md-6' style={{ text: 'align-right'}}>High</div>
          </div>
        </div>
        <div style={ style.reminder }>Click on a building for more information!</div> */}
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     changeViz: changeViz
//   },dispatch);
// }
// function mapStateToProps(state) {
//   return{
//     activeButton: state.userInterface.get('activeButton')
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Interface);
export default InterfaceDropdown;
