import React from 'react';
import ReactDOM from 'react-dom';
import Popover from 'material-ui/Popover'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Profile from './Profile.jsx';

const style = {
  display: 'flex',
  margin: '16, 32, 16, 0',
  style: {
    color: 'white',
    background: 'green'
  }
};

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      displayProfile: false
    }
    this.handleLogout = this.handleLogout.bind(this);
  };

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  handleLogout = () => {
    this.props.auth.logout();
    window.location.reload();
  };



  render() {
    return (
      <div className="header_container">
        <a class="header_logo--button" href="/"/>
        <RaisedButton className="nav_menu"
          onClick={this.handleTouchTap}
          label="Account Info"
        />
        <Popover 
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Paper style={style}>
            <DropDownMenu>
              <MenuItem primaryText="Trip History" />
              <MenuItem primaryText="User Profile" />
              <MenuItem onClick={(e) => {this.handleLogout(e)}} primaryText="Logout" />
            </DropDownMenu>
          </Paper>
        </Popover>


      </div>
      )
  }
}

export default Header;