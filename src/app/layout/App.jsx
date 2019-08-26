import React, { Component, Fragment } from 'react';
import MeetingDashboard from '../../features/meeting/MeetingDashboard/MeetingDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router';
import HomePage from '../../features/home/HomePage';
import MeetingDetailedPage from '../../features/meeting/MeetingDetailed/MeetingDetailedPage';
import EmployeeDashboard from '../../features/user/EmployeeDashboard/EmployeeDashboard';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import MeetingForm from '../../features/meeting/MeetingForm/MeetingForm';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import TestComponent from '../../features/test/TestComponent';
import ModalManager from '../../features/modals/ModalManager';

// Material UI
import Admin from '../../layouts/Admin';
import 'assets/css/material-dashboard-react.css?v=1.7.0';

//seperate homepage away from app
class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <Route exact path='/' component={HomePage} />
        <Route
          path='/(.+)'
          render={() => (
            <Fragment>
              <NavBar />
              <Route path='/admin' component={Admin} />

              <Container className='main'>
                <Switch key={this.props.location.key}>
                  <Route exact path='/meetings' component={MeetingDashboard} />
                  <Route path='/meetings/:id' component={MeetingDetailedPage} />
                  <Route path='/employees' component={EmployeeDashboard} />
                  <Route path='/profile/:id' component={UserDetailedPage} />
                  <Route path='/settings' component={SettingsDashboard} />
                  <Route
                    path={['/createMeeting', '/manage/:id']}
                    component={MeetingForm}
                  />
                  <Route path='/test' component={TestComponent} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);
