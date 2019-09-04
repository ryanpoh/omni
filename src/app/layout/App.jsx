import React, { Component, Fragment } from 'react';
import MeetingDashboard from '../../features/meeting/MeetingDashboard/MeetingDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router';
import HomePage from '../../features/home/HomePage';
import MeetingDetailedPage from '../../features/meeting/MeetingDetailed/MeetingDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import MeetingForm from '../../features/meeting/MeetingForm/MeetingForm';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import ModalManager from '../../features/modals/ModalManager';
import NotFound from './NotFound';


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
              <Container className='main'>
                <Switch key={this.props.location.key}>
                  <Route exact path='/meetings' component={MeetingDashboard} />
                  <Route path='/meetings/:id' component={MeetingDetailedPage} />
                  <Route path='/profile/:id' component={UserDetailedPage} />
                  <Route path='/settings' component={SettingsDashboard} />
                  <Route
                    path={['/createMeeting', '/manage/:id']}
                    component={MeetingForm}
                  />
                  <Route component={NotFound} />
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
