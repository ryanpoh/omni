import React, { Fragment } from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SignedInMenu = ({ signOut, profile, auth }) => {
  return (
    <Fragment>
      <Menu.Item position='right'>
        <Image
          avatar
          spaced='right'
          src={profile.photoURL || '/assets/user.png'}
        />
        <Dropdown pointing='top left' text={profile.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item
              href='http://www.analytics-omni-monash.com/home'
              text='Analytics'
              icon='chart bar'
            />
            <Dropdown.Item
              as={Link}
              to={`/profile/${auth.uid}`}
              text='My Profile'
              icon='user'
            />
            <Dropdown.Item
              as={Link}
              to='/settings'
              text='Settings'
              icon='settings'
            />
            <Dropdown.Item onClick={signOut} text='Sign Out' icon='power' />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Fragment>
  );
};

export default SignedInMenu;
