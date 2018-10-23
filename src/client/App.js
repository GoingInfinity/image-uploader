import React, { Component } from 'react';
import UploadContainer from './components/UploadContainer'
import './app.css';

export default class App extends Component {
  state = { };

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <UploadContainer />
        </div>
      </div>
    );
  }
}
