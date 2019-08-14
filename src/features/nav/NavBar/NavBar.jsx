import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedInMenu from "../Menus/SignedInMenu";
import SignedOutMenu from "../Menus/SignedOutMenu";
import { openModal } from "../../modals/modalActions";
import {logout} from "../../auth/authActions"

const actions = {
  openModal,
  logout
};

const mapState = (state) => ({ //passes in whole redux auth state
  auth: state.auth
})

class NavBar extends Component {

  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.logout()
    this.props.history.push("/");
  };

  render() {
    const { authenticated, currentUser } = this.props.auth; //redux auth state are passed in as props
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} exact to='/' header>
            <img src='/assets/omni.png' alt='logo' />
            OMNI
          </Menu.Item>
          <Menu.Item as={NavLink} exact to='/meetings' name='Meetings' />
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
          {authenticated ? (
            <SignedInMenu signOut={this.handleSignOut} currentUser={currentUser} />
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

export default withRouter(
  connect(
    mapState,
    actions
  )(NavBar)
);

// higher order withRouter Component. Give NavBar Router Powers
