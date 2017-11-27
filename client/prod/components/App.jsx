import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, BrowserRouter, Redirect, withRouter } from 'react-router-dom';
import Search from './Search.jsx';
import Header from './Header.jsx';
import Auth from '../../../Auth/Auth.js';
import Profile from './Header_Helpers/Profile.jsx';
import Budget from './Budget.jsx';
import Activities from './Activities.jsx';
import About from './About.jsx';

const auth = new Auth();
const style = {};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        email: '',
        location: '',
      },
      activities: {
        events: [],
        food: [],
        travel: [],
      },
      input: {
        budget: 0,
      },
      selectedActivities: {},
    };

    this.updateActivities = this.updateActivities.bind(this);
    this.addSelectActivity = this.addSelectActivity.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  componentDidMount() {
    if (auth.isAuthenticated()) {
      let localCookieProfile = JSON.parse(localStorage.getItem('profile'));

      let user = {
        username: localCookieProfile.name,
        email: localCookieProfile.email,
        location: 'California',
      };
      this.setState({ user });
    }
  }

  updateInput(data) {
    const budget = parseFloat(data.budget);
    this.setState({
      input: { budget },
    });
  }

  updateActivities(data) {
    this.setState({
      activities: data,
    });
  }

  addSelectActivity(data) {
    let selectedActivities = Object.assign({}, this.state.selectedActivities);
    if (data.checked === 'true') {
      selectedActivities[data.id] = data;
      this.setState({ selectedActivities });
    } else {
      delete selectedActivities[data.id];
      this.setState({ selectedActivities });
    }
  }

  render() {
    if (!auth.isAuthenticated()) {
      return <Login auth={auth} />;
    } else {
      return (
        <MuiThemeProvider>
          <div>
            <div className="top-section">
              <Header auth={auth} user={this.state.user} />
              <Search updateActivities={this.updateActivities} user={this.state.user} updateInput={this.updateInput} />
            </div>
            <About displayStyle='mainPage'/>
            <Activities selector={this.addSelectActivity} activities={this.state.activities} user={this.state.user} />
            <Budget selectedTrip={this.state.selectedActivities} budget={this.state.input.budget} />
          </div>
        </MuiThemeProvider>
      );
    }
  }
}
export default App;
