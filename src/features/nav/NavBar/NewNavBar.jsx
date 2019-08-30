import React, { Component, Fragment } from 'react';
import { Input, Menu, Grid } from 'semantic-ui-react';

class NewNavBar extends Component {
  state = {
    dropdownMenuStyle: {
      display: 'none'
    }
  };

  handleToggleDropdownMenu = () => {
    let newState = Object.assign({}, this.state);
    if (newState.dropdownMenuStyle.display === 'none') {
      newState.dropdownMenuStyle = { display: 'flex' };
    } else {
      newState.dropdownMenuStyle = { display: 'none' };
    }

    this.setState(newState);
  };

  state = {};
  handleItemClick = name => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
<Fragment>
        <Menu borderless inverted fluid fixed='top'>
          <Menu.Item header as='a'>
            Project name
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input placeholder='Search...' size='small' />
            </Menu.Item>
            <Menu.Item as='a'>Dashboard</Menu.Item>
            <Menu.Item as='a'>Settings</Menu.Item>
            <Menu.Item as='a'>Profile</Menu.Item>
            <Menu.Item as='a'>Help</Menu.Item>
          </Menu.Menu>
        </Menu>
        <Grid>
          <Grid.Column width={4}>
            <Menu vertical>
              <Menu.Item>
                <Menu.Header>Products</Menu.Header>

                <Menu.Menu>
                  <Menu.Item
                    name='enterprise'
                    active={activeItem === 'enterprise'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='consumer'
                    active={activeItem === 'consumer'}
                    onClick={this.handleItemClick}
                  />
                </Menu.Menu>
              </Menu.Item>

              <Menu.Item>
                <Menu.Header>CMS Solutions</Menu.Header>

                <Menu.Menu>
                  <Menu.Item
                    name='rails'
                    active={activeItem === 'rails'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='python'
                    active={activeItem === 'python'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='php'
                    active={activeItem === 'php'}
                    onClick={this.handleItemClick}
                  />
                </Menu.Menu>
              </Menu.Item>

              <Menu.Item>
                <Menu.Header>Hosting</Menu.Header>

                <Menu.Menu>
                  <Menu.Item
                    name='shared'
                    active={activeItem === 'shared'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='dedicated'
                    active={activeItem === 'dedicated'}
                    onClick={this.handleItemClick}
                  />
                </Menu.Menu>
              </Menu.Item>

              <Menu.Item>
                <Menu.Header>Support</Menu.Header>

                <Menu.Menu>
                  <Menu.Item
                    name='email'
                    active={activeItem === 'email'}
                    onClick={this.handleItemClick}
                  >
                    E-mail Support
                  </Menu.Item>

                  <Menu.Item
                    name='faq'
                    active={activeItem === 'faq'}
                    onClick={this.handleItemClick}
                  >
                    FAQs
                  </Menu.Item>
                </Menu.Menu>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
            <h1>EmployeeDashboard</h1>
          </Grid.Column>
        </Grid>
        </Fragment>
    );
  }
}

export default NewNavBar;
