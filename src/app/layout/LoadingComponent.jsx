import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingComponent = ({ inverted = true }) => {
  //lighter background
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content='Loading...' />
    </Dimmer>
  );
};

export default LoadingComponent;
