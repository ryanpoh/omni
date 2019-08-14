import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "semantic-ui-react";

const AnyReactComponent = () => <Icon  name='marker' size='big' color='red' />;

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 11
  };

  render() {
    const { latLng } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCfTPRxwG5i7G0_1EawFGM3hIy5L2uINSg" }}
          defaultCenter={latLng}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={latLng.lat}
            lng={latLng.lng}
            text='My Marker'
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
