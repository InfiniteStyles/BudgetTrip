import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

const axios = require('axios');

const style = {
  paper: {
    height: 500,
    width: 500,
    marginTop: 20,
    textAlign: 'center',
    paddingTop: 20,
    borderTop: '5px solid tan',
    borderRight: '5px solid tan',
    borderLeft: '5px solid tan'
  },
  container: {
    marginLeft: 20,
    width: 100,
  },
  button: {
    margin: 15,
  },
};

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    let minDate = new Date();
    let maxDate = new Date();
    minDate = 0;
    maxDate = 0;
    // minDate.setFullYear(minDate.getFullYear() - 1);
    // maxDate.setFullYear(maxDate.getFullYear() - 1);

    this.state = {
      budget: '',
      location: '',
      startDate: minDate,
      endDate: maxDate,
      lat: '',
      lng: '',
    };
    
    this.onChange = input => {
      this.setState({ input });
    };

    this.monitor = this.monitor.bind(this);
    this.search = this.search.bind(this);
    this.handleChangeMinDate = this.handleChangeMinDate.bind(this);
    this.handleChangeMaxDate = this.handleChangeMaxDate.bind(this);
    this.getTravel = this.getTravel.bind(this);
    this.getFood = this.getFood.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  handleChangeMinDate(event, date) {
    this.setState({
      startDate: date,
    });
  }

  handleChangeMaxDate(event, date) {
    this.setState({
      endDate: date,
    });
  }

  monitor(event) {
    const target = event.target;
    const name = target.name;

    this.setState(() => {
      return {
        [name]: target.value,
      };
    });

    if (name === 'location') {
      this.locationAutoComplete(event);
    }
  }

  locationAutoComplete(event) {
    const input = event.target;
    if (!input) return;
    const suggestion = new google.maps.places.Autocomplete(input);
    suggestion.addListener('place_changed', () => {
      const place = suggestion.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const location = place.formatted_address;
      this.setState({
        lat: lat,
        lng: lng,
        location: location,
      });
    });
  }

  getTravel(data) {
    return axios.post('/api/travel/search', data);
  }

  getFood(data) {
    return axios.post('/api/food/search', data);
  }

  getEvents(data) {
    return axios.post('/api/events/search', data);
  }

  saveData(data) {
    return axios.post('/api/search-data', data);
  }

  handleSubmit(e) {
    const data = {
      budget: this.state.budget,
    };
    this.search(e);
    this.props.updateInput(data);
    this.setState({
      budget: '',
      location: '',
      startDate: 0,
      endDate: 0, 
    });
  }

  formatDate(date) {
    const days = {
      0: "Sun",
      1: "Mon",
      2: "Tues",
      3: "Wed",
      4: "Thurs",
      5: "Fri",
      6: "Sat",
    };

    /*
    Mon, Jan-19
    */

    const day = date.getDay();
    return days[day] + ", " + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  }
  search(event) {
    event.preventDefault();
    const data = {
      budget: this.state.budget,
      location: this.state.location,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      lat: this.state.lat,
      lng: this.state.lng,
      user: this.props.user.username,
    };

    axios
      .all([this.getEvents(data), this.getFood(data), this.getTravel(data), this.saveData(data)])
      .then((data) => {
        const objForm = {};
        objForm.events = data[0].data;
        objForm.food = data[1].data;
        objForm.travel = data[2].data;
        this.props.updateActivities(objForm);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const data = {
      budget: this.state.budget,
    };
    let self = this;
    let tempBudget = this.state.budget;

    return (
      <div className="container" style={style.container}>
        <Paper style={style.paper} zDepth={2}>
          <h2>Where do you want to go today?</h2>
          <form autoComplete="off">
            <TextField
              name="budget"
              floatingLabelText="Budget Amount"
              onChange={this.monitor}
              value={this.state.budget}
            />
            <TextField
              name="location"
              placeholder=""
              floatingLabelText="Location"
              id="location"
              onChange={this.monitor}
              value={this.state.location}
            />
            <DatePicker
              name="startDate"
              floatingLabelText="Start Date"
              autoOk={true}
              onChange={this.handleChangeMinDate}
              value={this.state.startDate}
              formatDate={this.formatDate}
            />
            <DatePicker
              name="endDate"
              onChange={this.handleChangeMaxDate}
              autoOk={true}
              floatingLabelText="End Date"
              value={this.state.endDate}
              formatDate={this.formatDate}
            />
            <RaisedButton
              label="Submit"
              primary={true}
              onClick={
                this.handleSubmit
                // function(e) {
                // self.search(e);
                // self.props.updateInput(data);
                // }
              }
              style={style.button}
              value="Submit"
            />
          </form>
        </Paper>
      </div>
    );
  }
}
