import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedInMenu from "../Menus/SignedInMenu";
import SignedOutMenu from "../Menus/SignedOutMenu";

class NavBar extends Component {
  state = {
    authenticated: true
  };
  handleSignIn = () => this.setState({ authenticated: true });
  handleSignOut = () => {
    this.setState({ authenticated: false });
    this.props.history.push("/");
  };

  render() {
    const { authenticated } = this.state;
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
            <SignedInMenu signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);

// higher order withRouter Component. Give NavBar Router Powers
