import React, { Component, Fragment } from "react";
import MeetingDashboard from "../../features/meeting/MeetingDashboard/MeetingDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route } from "react-router";
import HomePage from "../../features/home/HomePage";
import MeetingDetailedPage from "../../features/meeting/MeetingDetailed/MeetingDetailedPage";
import EmployeeDashboard from "../../features/user/EmployeeDashboard/EmployeeDashboard";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import MeetingForm from "../../features/meeting/MeetingForm/MeetingForm";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import TestComponent from "../../features/test/TestComponent";


//seperate homepage away from app
class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path='/' component={HomePage} />
        <Route
          path='/(.+)'
          render={() => (
            <Fragment>
              <NavBar />
              <Container className='main'>
                <Route path='/meetings' component={MeetingDashboard} />
                <Route path='/meetings/:id' component={MeetingDetailedPage} />
                <Route path='/employees' component={EmployeeDashboard} />
                <Route path='/profile/:id' component={UserDetailedPage} />
                <Route path='/settings' component={SettingsDashboard} />
                <Route path='/createMeeting' component={MeetingForm} />
                <Route path='/test' component={TestComponent} />
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default App;
