import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import axios from 'axios';

const styles = {
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

export default class Food extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.addFood = this.addFood.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
  }

  addFood() {
    const data = {
      user: this.props.user,
      food: this.props.restaurant.restaurant,
    };
    axios.post('http://127.0.0.1:1130/api/food/add', data).then(data => {
      console.log('clicked the food item;');
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
    if (!parseFloat(this.props.restaurant.restaurant.cost)) {
      price = null;
    } else {
      price = this.props.restaurant.restaurant.cost;
    }
    const data = {
      id: `${this.props.id}`,
      name: `${this.props.restaurant.restaurant.name}`,
      description: `${this.props.restaurant.restaurant.cuisines}`,
      price: `${price}`,
      checked: `${!this.state.checked}`,
    };
    this.props.selector(data);
  }

  render() {
    return (
      <div className="food_container">
        <div className="foodImg_container">
          <img className="food_img" src={this.props.restaurant.restaurant.thumb} alt={this.props.restaurant.restaurant.name} />
        </div>
          <p className="food_title">Restaurant: {this.props.restaurant.restaurant.name}</p>
          <p className="food_perex">Cuisine: {this.props.restaurant.restaurant.cuisines}</p>
          <p className="food_price">Average Cost (For two): {this.props.restaurant.restaurant.average_cost_for_two}</p>
          <p className="food_hours">Address: {this.props.restaurant.restaurant.location.address}</p>
          <Checkbox
            className="food_addButton"
            id={this.props.id}
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            label="Add Food"
            style={styles.favoriteCheckbox}
            onCheck={e => {
              this.updateCheck(e);
            }}
          />
      </div>
    );
  }
}
