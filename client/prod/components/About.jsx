import React, { Component } from 'react';

const styles = {
	display: 'none'
}



export default class About extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}


  render(){

  	return (<div>
	    <div className={this.props.displayStyle === 'mainPage' ? 'main-about-us' : 'about-us'}>
	      <h3>Welcome to BudgetTrip.</h3>
	      <p>All your travels don't have to be so expensive.<br/><br/>
	      Let us help simplify your vacation.<br/><br/>
	      BudgetTrip helps plan travel, hotels, restaurants, and events all in one place.
	      So that you can have a wonderful trip and make it home with money to spare.</p>
	    </div>
    </div>)
  }
}
