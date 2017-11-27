import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
  button: {
    margin: 10,
  },
  favoriteCheckbox: {
    marginBottom: 16,
  },
  block: {
    maxWidth: 250,
  },
  paper: {
    margin: 20,
    display: 'inline-block',
  },
};

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.addEvent = this.addEvent.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
  }

  addEvent() {
    const data = {
      user: this.props.user,
      event: this.props.event,
    };
    this.setState({ selected: [...this.state.selected, data.event] });
  }

  updateCheck(e) {
    let hold = e;
    this.setState(oldState => {
      return {
        checked: !oldState.checked,
      };
    });
    this.updateSelected(hold);
  }

  updateSelected(e) {
    let price;
    if (!parseFloat(this.props.event.cost)) {
      price = null;
    } else {
      price = this.props.event.cost;
    }
    let data = {
      id: `${this.props.id}`,
      name: `${this.props.event.name}`,
      description: `${this.props.event.description}`,
      price: `${this.props.event.cost}`,
      checked: `${!this.state.checked}`,
    };
    this.props.selector(data);
  }

  render() {
    return (
      <div className="event_container">
        <div className="eventImg_container">
          <img className="event_img" src={this.props.event.image_url} alt={this.props.event.name} />
        </div>
        <p className="event_title">Event: {this.props.event.name}</p>
        <p className="event_perex">Description: {this.props.event.description}</p>
        <p className="event_price">Cost: {this.props.event.cost}</p>
        <p className="event_hours">Start time: {this.props.event.time_start} --- End time: {this.props.event.time_end}</p>
        <Checkbox
          className="event_addButton"
          id={this.props.id}
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Add Event"
          styles={styles.favoriteCheckbox}
          onCheck={e => {
            this.updateCheck(e);
          }}
        />
      </div>
    );
  }
}
