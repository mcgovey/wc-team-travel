// import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Interface from '../containers/Interface';
import ReactMapGL from '../containers/ReactMapGL';


export default class App extends Component {

  render() {
    console.log('process')
    return (
      <div>
        <Interface />
        {/* <ReactMap
          token= { TOKEN }
          longitude= { LONG }
          latitude= { LAT }
          zoom= { ZOOM }
          showPopUp= { true }
          styleID = { STYLE_ID }
        /> */}
        {/* <div className='col12 pad4 contain fill-navy dark clip'>
  <div className='center quiet'></div>
</div> */}
        <ReactMapGL />
      </div>
    );
  }
}
