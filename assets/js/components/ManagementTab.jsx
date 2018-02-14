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
  },
  nestedContainer: {
    display: "flex",
    flexDirection: "column",
  },
  item: {
    flexGrow: 1
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
        <List>
          <Subheader>Polling interval</Subheader>
          <IntervalSlider name="" unit="ms" axis="x"/>
        </List>
        <List>
          <Subheader>Open valve time</Subheader>
          <IntervalSlider name="" unit="ms" axis="x"/>
        </List>
        <Divider />
        <List>
          <Subheader>Open valve days</Subheader>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(function(day, i){
            return (
              <ListItem
              leftCheckbox={<Checkbox
                checkedIcon={<ActionFavorite />}
                uncheckedIcon={<ActionFavoriteBorder />}
                label={day}
                onCheck={this.updateCheck.bind(this)}
                style={styles.checkbox}
                key={i}
              />}
            />
            )
          }.bind(this))
          }
        </List>
        <Divider />
        <List>
          <Subheader>Open valve hour</Subheader>
          <TimePicker onChange={this.setPeriodicity.bind(this)} />
        </List>
      </div>

      // <div style={styles.container}>
      //   <div style={styles.nestedContainer}>
      //     <div style={styles.item}>
      //       <IntervalSlider name="Water for" unit="ms" axis="x"/>
      //     </div>
      //     <div style={styles.item}>
      //       <IntervalSlider name="Polling each" unit="ms" axis="x"/>
      //     </div>
      //   </div>
        
      //   <div style={styles.item}>
      //     <TimePicker onChange={this.setPeriodicity.bind(this)} />
      //   </div>
      //   <div style={styles.item}>
      //     <WeekSelectBox/>
      //   </div>
      // </div>
    );
  }
}