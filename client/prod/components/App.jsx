import React from 'react';
import Login from './login.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from './Search.jsx';
import Header from './Header.jsx';
import Auth from '../../../Auth/Auth.js';
import Profile from './Header_Helpers/Profile.jsx';
import Budget from './Budget.jsx';
import Activities from './Activities.jsx';
import About from './About.jsx';

const auth = new Auth();

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
      activeSearch: false,
    };

    this.updateActivities = this.updateActivities.bind(this);
    this.addSelectActivity = this.addSelectActivity.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.updateSearchStatus = this.updateSearchStatus.bind(this);
  }

  componentDidMount() {
    if (auth.isAuthenticated()) {
      const localCookieProfile = JSON.parse(localStorage.getItem('profile'));

      const user = {
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

  updateSearchStatus() {
    this.setState({ activeSearch: true });
  }

  addSelectActivity(data) {
    const selectedActivities = Object.assign({}, this.state.selectedActivities);
    if (data.checked === 'true') {
      selectedActivities[data.id] = data;
      this.setState({ selectedActivities });
    } else {
      delete selectedActivities[data.id];
      this.setState({ selectedActivities });
    }
  }

  render() {
    console.log('State of the app: ', this.state);
    const { activeSearch } = this.state;
    const page =
      activeSearch === true ? (
        <div>
          <Activities selector={this.addSelectActivity} activities={this.state.activities} user={this.state.user} />
          <Budget selectedTrip={this.state.selectedActivities} budget={this.state.input.budget} />
        </div>
      ) : null;

    if (!auth.isAuthenticated()) {
      return <Login auth={auth} />;
    }
    return (
      <MuiThemeProvider>
        <div>
          <div className="top-section">
            <div>
              <Header auth={auth} user={this.state.user} />
              <Search
                updateActivities={this.updateActivities}
                user={this.state.user}
                updateInput={this.updateInput}
                updateSearchStatus={this.updateSearchStatus}
              />
              <About displayStyle="mainPage" />
            </div>
          </div>
          {page}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
