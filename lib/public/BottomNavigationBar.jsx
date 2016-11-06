import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const nearbyIcon = <IconLocationOn />;
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
  } 

  render() {
    return (
      <Paper zDepth={1} style={style}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Nearby"
            icon={nearbyIcon}
            onTouchTap={() => this.select(0)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}