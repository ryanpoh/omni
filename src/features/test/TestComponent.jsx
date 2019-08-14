import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementCounter, decrementCounter } from "./testActions";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "./TestPlaceInput";
import SimpleMap from "./SimpleMap";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const mapStateToProps = state => ({
  data: state.test.data
});

const actions = {
  incrementCounter,
  decrementCounter
};

class TestComponent extends Component {
  state = {
    latLng: {}
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          latLng: latLng
        });
      })
      .catch(error => console.error("Error", error));
  };

  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h1>TestComponent</h1>
        <h2>The answer is {data}</h2>
        <Button onClick={incrementCounter} positive content='Increment' />
        <Button onClick={decrementCounter} negative content='Decrement' />
        <br />
        <br />
        <TestPlaceInput selectAddress={this.handleSelect} />
        <SimpleMap key={this.state.latLng.lng} latLng={this.state.latLng} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(TestComponent);
