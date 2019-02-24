import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const healthIcon = <FontIcon className="material-icons">restore</FontIcon>;
const manageIcon = <FontIcon className="material-icons">build</FontIcon>;
const chartIcon = <FontIcon className="material-icons">build</FontIcon>;

const style = {
  bottom: '0',
  position: 'fixed',
  width: '100%',
  right: '0px'
};

export default class BottomNavigationBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  select(index){
    this.setState({selectedIndex: index});
    this.props.onTabChange(index);
  } 

  render() {
    return (
      <Paper zDepth={1} style={style}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Health"
            icon={healthIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Charts"
            icon={chartIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Manage"
            icon={manageIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}
