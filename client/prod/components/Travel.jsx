import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import axios from 'axios';

const styles = {
  block: {
    maxWidth: 250,
  },
  favoriteCheckbox: {
    marginBottom: 16,
  },
  paper: {
    margin: 20,

  },
};

class Travel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.addPlace = this.addPlace.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
  }

  addPlace() {
    const data = {
      user: this.props.user,
      travel: this.props.travel.place,
    };
    axios.post('http://127.0.0.1:1130/api/travel/add', data).then(data => {
      console.log('clicked data =============>', data);
    });
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
    if (!parseFloat(this.props.travel.place.admission)) {
      price = null;
    } else {
      price = this.props.travel.place.admission;
    }
    let data = {
      id: `${this.props.id}`,
      name: `${this.props.travel.place.name}`,
      description: `${this.props.travel.place.perex}`,
      price: `${price}`,
      checked: `${!this.state.checked}`,
    };
    this.props.selector(data);
  }

  render() {
    return (
      <div className="travel_container">
        <div className="travelImg_container">
          <img className="travel_img" src={this.props.travel.place.picture} alt={this.props.travel.place.name} />
        </div>
        <h3 className="travel_title">{this.props.travel.place.name}</h3>
        <p className="travel_perex">{this.props.travel.place.perex}</p>
        <p className="travel_price">{this.props.travel.place.admission}</p>
        <p className="travel_hours">{this.props.travel.place.opening_hours}</p>
        <Checkbox
          className="travel_addButton"
          id={this.props.id}
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Add Place"
          style={styles.checkbox}
          onCheck={e => {
            this.updateCheck(e);
          }}
        />
      </div>
    );
  }
}

export default Travel;
