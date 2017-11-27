import React from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';

const WAIT_INTERVAL = 1000;

class Budget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      budgetTotal: 0,
      moneyLeft: 0,
      moneySpent: 0,
      activities: [],
      negative: false,
      value: 0,
      fields: {},
      table: {
        fixedHeader: true,
        fixedFooter: true,
        stripedRows: false,
        showRowHover: false,
        selectable: false,
        showCheckboxes: false,
      },
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.timer = null;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ budgetTotal: nextProps.budget }, function() {
      if (!this.state.moneyLeft) {
        this.setState({
          moneyLeft: this.state.budgetTotal,
        });
      }
      this.setState({
        activities: nextProps.selectedTrip,
      });
    });
  }

  handleToggle = (e, toggled) => {
    this.setState({
      [event.taget.name]: toggled,
    });
  };

  handleThrottledInput(e, newVal) {
    let self = this;
    let target = e.target.id;
    let targetValue = e.target.value;
    if (targetValue === '') {
      targetValue = 0;
    }
    clearTimeout(this.timer);

    this.timer = setTimeout(function() {
      self.handlePriceInput(target, targetValue, newVal);
    }, WAIT_INTERVAL);
  }

  handlePriceInput = (target, targetValue, newVal) => {
    if (!this.state.fields[target]) {
      let fields = Object.assign({}, this.state.fields);
      fields[target] = [targetValue];
      this.setState({ fields });
    } else {
      let adjustedMoneyLeft =
        parseFloat(this.state.moneyLeft) + parseFloat(this.state.fields[target][this.state.fields[target].length - 1]);
      let adjustedMoneySpent =
        parseFloat(this.state.moneySpent) - parseFloat(this.state.fields[target][this.state.fields[target].length - 1]);
      this.setState({
        moneyLeft: adjustedMoneyLeft,
        moneySpent: adjustedMoneySpent,
      });
      let fields = Object.assign({}, this.state.fields);
      fields[target] = this.state.fields[target].concat([targetValue]);
      this.setState({ fields });
    }

    this.setState(
      {
        value: targetValue,
        moneySpent: this.state.moneySpent + parseFloat(targetValue),
      },
      function() {
        this.setState({ moneyLeft: this.state.budgetTotal - this.state.moneySpent });
      }
    );

    if (this.state.moneyLeft < 0) {
      this.setState({
        negative: true,
      });
    } else {
      this.setState({
        negative: false,
      });
    }
  };

  render() {
    let negativeStyle = {
      color: this.state.negative ? 'red' : 'black',
      textAlign: 'center',
    };
    let selectedTrip = this.state.activities;

    return (
      <div className="budget">
        <Table
          height={this.state.table.height}
          fixedHeader={this.state.table.fixedHeader}
          fixedFooter={this.state.table.fixedFooter}
          selectable={this.state.table.selectable}
          multiSelectable={this.state.table.multiSelectable}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={this.state.table.showCheckboxes}
            enableSelectAll={this.state.table.enableSelectAll}>
            <TableRow>
              <TableHeaderColumn style={negativeStyle} colSpan="3" tooltip="BudgetTrip">
                {
                  <h1>{`Total Budget: $${this.state.budgetTotal} Total Spent: $${this.state.moneySpent} Budget Left: $${
                    this.state.moneyLeft
                  }`}</h1>
                }
              </TableHeaderColumn>
            </TableRow>
            <TableRow className="table_labels">
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn>Cost</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.table.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}>
            {Object.keys(selectedTrip).map((activity, idx) => (
              <TableRow key={`${activity}_${idx}`}>
                <TableRowColumn key={selectedTrip[activity].name}>{selectedTrip[activity].name}</TableRowColumn>
                <TableRowColumn key={selectedTrip[activity].description}>
                  {selectedTrip[activity].description}
                </TableRowColumn>
                <TableRowColumn key={selectedTrip[activity].price}>{selectedTrip[activity].price}</TableRowColumn>
                <TextField
                  key={`${idx}`}
                  id={`${selectedTrip[activity].name}`}
                  onChange={(e, newVal) => {
                    this.handleThrottledInput(e, newVal);
                  }}
                  type="number"
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Budget;