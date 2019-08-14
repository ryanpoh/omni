import React from 'react'
import { Segment, Icon } from 'semantic-ui-react';
import GoogleMapReact from "google-map-react";

const Marker = () => <Icon  name='marker' size='big' color='red' />;

const MeetingDetailedMap = ({lat,lng}) => {
    const zoom = 14;
    return (
    <Segment attached='bottom' style={{padding: 0}}>
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCfTPRxwG5i7G0_1EawFGM3hIy5L2uINSg" }}
          defaultCenter={{lat, lng}}
          defaultZoom={zoom}
        >
          <Marker
            lat={lat}
            lng={lng}
            text='My Marker'
          />
        </GoogleMapReact>
      </div>
    </Segment>
    )
}

export default MeetingDetailedMap
