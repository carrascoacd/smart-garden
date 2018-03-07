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
    width: "276px"
  }
}

export default class ManagementTab extends Component {

  constructor(props){
    super(props);
    this.state = {
      periodicity: null,
      checked: false,
      pollingInterval: null,
      controlInterval: null
    }
  }

  componentDidMount(){
    this.getIntervals()
  }

  getIntervals(){
    fetch(`/api/devices/${this.props.device.id}/intervals`).then((response)=>{
      return response.json();
    }).then((data)=>{
      let pollingIntervalData = _.find(data.intervals, 
        function(intervalData){ return intervalData.action == "polling" }
      )
      let pollingInterval = this.buildIntervalObject(pollingIntervalData.execution_schedule)
      let controlIntervalData = _.find(data.intervals, 
        function(intervalData){ return intervalData.action != "polling" }
      )
      let controlInterval = this.buildIntervalObject(controlIntervalData.execution_schedule)
      this.setState({pollingInterval: pollingInterval, controlInterval: controlInterval})
    }).catch((err)=>{
      console.log(err);
    });
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

  buildCronExpression(minutes, hour){
    return `${minutes} ${hour} * * *`
  }

  buildIntervalObject(cronExpression){
    let cronValues = cronExpression.split(" ")
    return {
      minutes: parseInt(cronValues[0]) || 0,
      hour: parseInt(cronValues[1]) || 0,
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <List style={styles.item}>
          <Subheader>Polling interval</Subheader>
          { this.state.pollingInterval && 
            <ListItem>
              <IntervalSlider maxValue={60} unit="min" value={this.state.pollingInterval.minutes}/>
            </ListItem>
          }
        </List>
        <List style={styles.item}>
          <Subheader>Open valve time</Subheader>
          {
            this.state.controlInterval &&
            <ListItem>
              <IntervalSlider maxValue={200} unit="min" value={this.state.controlInterval.minutes}/>
            </ListItem>
          }
        </List>
        <Divider />
        <List style={styles.item}>
          <Subheader>Open valve hour</Subheader>
          <ListItem>
            <TimePicker onChange={this.setPeriodicity.bind(this)} name="hour" value={new Date()}/>
          </ListItem>
        </List>
        <Divider />
        <List style={styles.item}>
          <Subheader>Open valve days</Subheader>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(function(day, i){
            return (
              <ListItem
                key={i}
                leftCheckbox={
                <Checkbox
                  checkedIcon={<ActionFavorite />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  label={day}
                  onCheck={this.updateCheck.bind(this)}
                  checked={i % 2 == 0}
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