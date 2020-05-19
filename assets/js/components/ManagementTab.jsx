import { List, ListItem } from 'material-ui/List';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import IntervalSlider from './IntervalSlider.jsx';
import MenuItem from 'material-ui/MenuItem';
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import Subheader from 'material-ui/Subheader';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';

const actionMapping = {
  "open-valve" : 0,
  "reset" : 1,
  "polling" : 2
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "100px",
  },
  nestedContainer: {
    display: "flex",
    flexDirection: "column",
  },
  item: {
    flexGrow: 1,
    width: "100%",
  },
  toggle: {
    marginBottom: 16,
  }
}

export default class ManagementTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      intervals: []
    }
  }

  componentDidMount() {
    this.getIntervals()
  }

  getIntervals() {
    fetch(`/api/devices/${this.props.device.id}/intervals`).then((response) => {
      return response.json();
    }).then((data) => {
      let intervals = data.intervals.map(function(intervalData){
        return this.buildIntervalObject(intervalData)
      }, this)

      // Sort by index
      intervals.sort(function(a, b){
        return a.index > b.index;
      })

      this.setState({ interval: intervals[0], intervals: intervals })
    }).catch((err) => {
      console.log(err)
    });
  }

  updateInterval(interval, callback) {
    let executionSchedule = this.buildCronExpression(
      new Date(interval.date.getTime()), 
      interval.days
    )
    let bodyParams = JSON.stringify({
      interval: {
        value: interval.value * 60 * 1000, 
        execution_schedule: executionSchedule,
        active: interval.days.length > 0,
        action: interval.action,
        index: interval.index
      }
    })
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch(`/api/devices/${this.props.device.id}/intervals/${interval.id}`, {
      method: "PATCH",
      headers: headers,
      body: bodyParams
    }).then((data) => {
      callback(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  buildCronExpression(date, days) {
    date.setHours(date.getHours() + date.getTimezoneOffset() / 60)
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let parsedDays = days.join(",")
    return `${minutes} ${hour} * * ${parsedDays}`
  }

  buildIntervalObject(interval) {
    let cronValues = interval.execution_schedule.split(" ")
    let date = new Date()
    let hour = (parseInt(cronValues[1]) || 0) - date.getTimezoneOffset() / 60
    let minutes = parseInt(cronValues[0]) || 0
    date.setHours(hour, minutes)
    let days = _.map(cronValues[4].split(","), function (n) { return parseInt(n) })
    days =  _.filter(days, function(n){ return !isNaN(n) })
    return {
      id: interval.id,
      date: date,
      value: interval.value / 60 / 1000,
      days: days,
      action: interval.action,
      index: interval.index
    }
  }

  onChangeIndex(event, value) {
    // Exchange indexes
    value = value - 1 // To keep the 0 base index
    let previousInterval = this.state.intervals.find(function(interval){
      return interval.index == value
    })
    previousInterval.index = this.state.interval.index
    this.state.interval.index = value

    // Sort by index
    this.state.intervals.sort(function(a, b){
      return a.index > b.index;
    })

    this.updateInterval(this.state.interval, (data) => {
      this.setState({interval: this.state.interval, intervals: this.state.intervals})
    })
  }

  onChangeValue(event, value) {
    this.state.interval.value = value
    this.updateInterval(this.state.interval, (data) => {
      this.setState({interval: this.state.interval})
    })
  }

  onChangeControlHour(event, date) {
    this.state.interval.date = date
    this.updateInterval(this.state.interval, (data) => {
      this.setState({interval: this.state.interval})
    })
  }

  onChangeAction(event, value) {
    // Invert to get the key by value
    let action = (_.invert(actionMapping))[value];

    let interval = this.state.intervals.find(function(interval){
      return interval.action == action
    })

    // This is a workaround to force the duration picker to be updated
    this.setState({interval: null}, function(){
      this.setState({interval: interval})
    })
  }

  onCheckControlDay(event, isInputChecked) {
    let day = parseInt(event.target.value)
    if (isInputChecked == true){
      this.state.interval.days.push(day)
    }
    else {
      this.state.interval.days.splice(this.state.interval.days.indexOf(day), 1)
    }
    this.updateInterval(this.state.interval, (data) => {
      this.setState({interval: this.state.interval})
    })
  }

  render() {
    return (
      <div style={styles.container}>
      <Subheader>Order</Subheader>
      {
        this.state.interval &&
        <List style={styles.item}>
          <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
            <Stepper linear={false} activeStep={this.state.interval.index}>
            {
              this.state.intervals.map(function(interval, i){
                return (
                  <Step key={i} >
                    <StepButton>
                      { interval.action }
                    </StepButton>
                  </Step>
                )
              }, this)
            }
            </Stepper>
          </div>
        </List>
        }
        <List style={styles.item}>
          <Subheader>Action</Subheader>
          {
            this.state.interval &&
            <ListItem>
              <SelectField
                value={actionMapping[this.state.interval.action]}
                onChange={this.onChangeAction.bind(this)}
              >
                <MenuItem value={0} primaryText="Open valve" />
                <MenuItem value={1} primaryText="Reset" />
                <MenuItem value={2} primaryText="Polling" />
              </SelectField>
            </ListItem>
          }
        </List>
        <Divider />
        <List style={styles.item}>
          <Subheader>Duration</Subheader>
          {
          this.state.interval &&
            <ListItem>
              <IntervalSlider 
                maxValue={480} 
                unit="min" 
                value={this.state.interval.value} 
                onChange={this.onChangeValue.bind(this)} />
            </ListItem>
          }
        </List>
        <List style={styles.item}>
          <Subheader>Index</Subheader>
          {
            this.state.interval &&
            <ListItem>
              <TextField
                id="index"
                value={this.state.interval.index + 1}
                onChange={this.onChangeIndex.bind(this)}
              />
            </ListItem>
          }
        </List>
        <Divider />
        <List style={styles.item}>
          <Subheader>Hour</Subheader>
          {
            this.state.interval &&
            <ListItem>
              <TimePicker 
                onChange={this.onChangeControlHour.bind(this)}
                name="hour" 
                value={this.state.interval.date} />
            </ListItem>
          }
        </List>
        <Divider />
        <List style={styles.item}>
          <Subheader>Days</Subheader>
          {this.state.interval &&
            ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(function (day, i) {
              return (
                <ListItem
                  key={i}
                  leftCheckbox={
                    <Checkbox
                      checkedIcon={<ActionFavorite />}
                      uncheckedIcon={<ActionFavoriteBorder />}
                      label={day}
                      value={i + 1}
                      onCheck={this.onCheckControlDay.bind(this)}
                      checked={this.state.interval.days.includes(i + 1)}
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