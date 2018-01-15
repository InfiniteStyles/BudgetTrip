var path = require('path');
import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import axios from 'axios';
const Lock = require('../../../Auth/Auth.js').Lock;
import About from './About.jsx';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authors: ['Anto Wiwarsono', 'Anton Shtylman', 'Jacob Seo', 'Luke Garner'],
    };

    this.login = this.login.bind(this);
  }

  componentWillMount() {
    this.props.auth.handleAuthentication();
    Lock.on('authenticated', function(authResult) {
      console.log('Result of authentication', authResult);

      if (!authResult.accessToken) return;

      Lock.getUserInfo(authResult.accessToken, function(error, profile) {
        console.log('error', error, 'profile', profile);

        axios
          .post('/api/signup', profile)
          .then(function(sucess) {
            console.log('user data', sucess);
            window.location.reload();
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    });

    Lock.on('authorization_error', function(error) {
      console.log('authorization_error', error);
    });

    Lock.show();
  }

  login() {
    Lock.show();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="login_container">
        <div className="logo_container" />
        <button className="login_button" onClick={this.login}>
          Login
        </button>
        <About />
        <div className="authors_list">
          {this.state.authors.map((author, i) => {
            return <span key={i}>{author}</span>;
          })}
        </div>
      </div>
    );
  }
}

export default Login;
