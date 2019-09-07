import React, { Component, Fragment } from 'react'; //Fragment to get rid of adjacent element error {authenticated && xxx}
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';
import { openModal } from '../../modals/modalActions';

const actions = {
  openModal
};

const mapState = state => ({
  //passes in whole redux auth state
  auth: state.firebase.auth, // access authReducer of Firebase. http://react-redux-firebase.com/docs/auth
  profile: state.firebase.profile // access profileReducer of  Firebase. https://github.com/prescottprue/react-redux-firebase/blob/master/docs/api/reducers.md#profilereducer
});

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };

  render() {
    const { auth, profile } = this.props; //redux auth state are passed in as props
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} exact to='/' header>
            <img src='/assets/omni.png' alt='logo' />
            OMNI DASHBOARD
          </Menu.Item>
          <Menu.Item as={NavLink} exact to='/meetings' name='Meetings' />
          {authenticated && (
            <Fragment>
              <Menu.Item href='http://www.analytics-omni-monash.com' name='Analytics' />
              <Menu.Item>
                <Button
                  as={Link}
                  to='/createMeeting'
                  floated='right'
                  positive
                  inverted
                  content='Create Meeting'
                />
              </Menu.Item>
            </Fragment>
          )}
          {authenticated ? (
            <SignedInMenu
              signOut={this.handleSignOut}
              profile={profile}
              auth={auth}
            />
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withFirebase(
  withRouter(
    connect(
      mapState,
      actions
    )(NavBar)
  )
);

// higher order withRouter Component. Give NavBar Router Powers
