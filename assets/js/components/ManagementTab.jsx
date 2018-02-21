import React, {Component} from 'react';
import TimePicker from 'material-ui/TimePicker';
import IntervalSlider from './IntervalSlider.jsx';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "100px"
  },
  nestedContainer: {
    display: "flex",
    flexDirection: "column",
  },
  item: {
    flexGrow: 1,
    width: "276"
  }
}

export default class ManagementTab extends Component {

  constructor(props){
    super(props);
    this.state = {
      action: "open-valve",
      periodicity: null,
      checked: false
    }
  }

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  setPeriodicity(event, date){
    console.log(date.toString());
    this.state.periodicity = date
  }

  setAction(event, index, value){
    console.log(value);
    this.setState({action: value})
  }

  render() {
    return (
      <div style={styles.container}>
        <List style={styles.item}>
          <Subheader>Polling interval</Subheader>
          <ListItem>
            <IntervalSlider maxValue={200} unit="min"/>
          </ListItem>
        </List>
        <List style={styles.item}>
          <Subheader>Open valve time</Subheader>
          <ListItem>
            <IntervalSlider maxValue={200} unit="min"/>
          </ListItem>
        </List>
        <Divider />
        <List style={styles.item}>
          <Subheader>Open valve hour</Subheader>
          <ListItem>
            <TimePicker onChange={this.setPeriodicity.bind(this)} />
          </ListItem>
        </List>
        <Divider />
        <List style={styles.item}>
          <Subheader>Open valve days</Subheader>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(function(day, i){
            return (
              <ListItem
                leftCheckbox={<Checkbox
                checkedIcon={<ActionFavorite />}
                uncheckedIcon={<ActionFavoriteBorder />}
                label={day}
                onCheck={this.updateCheck.bind(this)}
                key={i}
              />}
            />
            )
          }.bind(this))
          }
        </List>
      </div>
    );
  }
}