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
        <ReactMapGL />
      </div>
    );
  }
}
