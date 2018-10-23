import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

export default class UploadContainer extends Component {
  state = {
    imgFile: {},
    imgURL: ''
  };

  dragOverHandler = (e) => {
    e.preventDefault();
  };

  dropHandler = (e) => {
    e.preventDefault();
    this.fileReader(e.dataTransfer.items[0].getAsFile());
    // debugger
  };

  fileReader = (file) => {
    // debugger
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      this.updateState(dataUrl, file);
    };
    reader.readAsDataURL(file);
  };

  updateState = (url, file) => {
    this.setState({
      imgFile: file,
      imgURL: url
    });
  };

  renderImages = () => {
    const { imgURL } = this.state;
    if (imgURL.length === 0) return;

    // debugger
    return <img src={imgURL} className="img" alt="no img" />;
  };

  uploadFile = (e) => {
    e.preventDefault();
    const { imgFile } = this.state;
    const data = new FormData();
    data.append('imgFile', imgFile);
    data.append('imgName', imgFile.name);

    axios
      .post('/upload', data)
      .then(response => console.log('response', response))
      .catch(error => console.log('error', error));
  };

  render() {
    console.log(this.state);
    const { imgFile } = this.state;
    return (
      <div className="container">
        <div className="drop-container" onDrop={this.dropHandler} onDragOver={this.dragOverHandler}>
          {this.renderImages() ? this.renderImages() : 'Drop image here'}
        </div>
        <div className="info-container">
          <p>
            name:
            {imgFile && imgFile.name}
          </p>
          <p>
            type:
            {imgFile && imgFile.type}
          </p>
          <p>
            size:
            {imgFile && imgFile.size}
          </p>
          <form onSubmit={this.uploadFile}>
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    );
  }
}
