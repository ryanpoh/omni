import React, { Component, createRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default

class CropperInput extends Component {
  cropper = createRef();

  cropImage =() => {
      const {setImage} = this.props;
      if (typeof this.cropper.current.getCroppedCanvas() === 'undefined') {
          return;
      }

      this.cropper.current.getCroppedCanvas().toBlob(blob => {
          setImage(blob)
      }, 'image/jpeg')

  }

  render() {
      const {imagePreview} = this.props
    return (
      <Cropper
        ref={this.cropper}
        src= {imagePreview}
        style={{ height: 200, width: '100%' }}
        // Cropper.js options
        preview = '.img-preview' // provides the preview we are going to create as a class style
        aspectRatio={1} // will enforce a square image
        viewMode={1} // stops user from trying to crop outside the image 
        dragMode='move' //allows the user to move their image around the crop box
        guides={false}
        scalable = {true}
        cropBoxMovable={true}
        cropBoxResizable={true}

        crop={this.cropImage} //place croppper image here
      />
    );
  }
}

export default CropperInput;
