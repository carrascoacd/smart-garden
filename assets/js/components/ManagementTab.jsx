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

const actionMapping = {
  "open-valve" : 0,
  "close-valve" : 1,
  "reset" : 2,
  "sleep" : 3
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
  },
}

export default class ManagementTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      interval: null
    }
  }

  componentDidMount() {
    this.getIntervals()
  }

  getIntervals() {
    fetch(`/api/devices/${this.props.device.id}/intervals`).then((response) => {
      return response.json();
    }).then((data) => {
      let intervalData = data.intervals[0];
      let interval = this.buildIntervalObject(intervalData)
      this.setState({ interval: interval })
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
        action: interval.action
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
      action: interval.action
    }
  }

  onChangePollingValue(event, value) {
    this.state.interval.value = value
    this.updateInterval(this.state.interval, (data) => {
      this.setState({interval: this.state.interval})
    })
  }

  onChangeControlValue(event, value) {
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
    this.state.interval.action = action
    this.updateInterval(this.state.interval, (data) => {
      this.setState({interval: this.state.interval})
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
        <List style={styles.item}>
          <Subheader>Next action to execute</Subheader>

          {
            this.state.interval &&
            <ListItem>
              <SelectField
                value={actionMapping[this.state.interval.action]}
                onChange={this.onChangeAction.bind(this)}
              >
                <MenuItem value={0} primaryText="Open valve" />
                <MenuItem value={1} primaryText="Close valve" />
                <MenuItem value={2} primaryText="Reset" />
                <MenuItem value={3} primaryText="Sleep" />
              </SelectField>
            </ListItem>
          }
        </List>
        <Divider />
        <List style={styles.item}>
          <Subheader>Polling interval</Subheader>
          {this.state.interval &&
            <ListItem>
              <IntervalSlider 
                maxValue={480} 
                unit="min" 
                value={this.state.interval.value} 
                onChange={this.onChangePollingValue.bind(this)} />
            </ListItem>
          }
        </List>
        <List style={styles.item}>
          <Subheader>Open valve time</Subheader>
          {
            this.state.interval &&
            <ListItem>
              <IntervalSlider 
                maxValue={200} 
                unit="min" 
                value={this.state.interval.value} 
                onChange={this.onChangeControlValue.bind(this)} />
            </ListItem>
          }
        </List>
        <Divider />
        <List style={styles.item}>
          <Subheader>Open valve hour</Subheader>
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
          <Subheader>Open valve days</Subheader>
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