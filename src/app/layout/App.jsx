import React, { Component } from "react";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";

class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>Omni</h1>
        <EventDashboard />
      </div>
    );
  }
}

export default App;
