import React, { Component } from 'react';
import TimePicker from 'material-ui/TimePicker';
import IntervalSlider from './IntervalSlider.jsx';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';

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
      pollingInterval: null,
      controlInterval: null
    }
  }

  componentDidMount() {
    this.getIntervals()
  }

  getIntervals() {
    fetch(`/api/devices/${this.props.device.id}/intervals`).then((response) => {
      return response.json();
    }).then((data) => {
      let pollingIntervalData = _.find(data.intervals,
        function (intervalData) { return intervalData.action == "polling" }
      )
      let pollingInterval = this.buildIntervalObject(pollingIntervalData)
      let controlIntervalData = _.find(data.intervals,
        function (intervalData) { return intervalData.action != "polling" }
      )
      let controlInterval = this.buildIntervalObject(controlIntervalData)
      this.setState({ pollingInterval: pollingInterval, controlInterval: controlInterval })
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
        force_open: interval.forceOpen
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
      forceOpen: interval.force_open
    }
  }

  onChangePollingValue(event, value) {
    this.state.pollingInterval.value = value
    this.updateInterval(this.state.pollingInterval, (data) => {
      this.setState({pollingInterval: this.state.pollingInterval})
    })
  }

  onChangeControlValue(event, value) {
    this.state.controlInterval.value = value
    this.updateInterval(this.state.controlInterval, (data) => {
      this.setState({controlInterval: this.state.controlInterval})
    })
  }

  onChangeControlHour(event, date) {
    this.state.controlInterval.date = date
    this.updateInterval(this.state.controlInterval, (data) => {
      this.setState({controlInterval: this.state.controlInterval})
    })
  }

  onChangeForceOpen(event, value) {
    this.state.controlInterval.forceOpen = value
    this.updateInterval(this.state.controlInterval, (data) => {
      this.setState({controlInterval: this.state.controlInterval})
    })
  }

  onCheckControlDay(event, isInputChecked) {
    let day = parseInt(event.target.value)
    if (isInputChecked == true){
      this.state.controlInterval.days.push(day)
    }
    else {
      this.state.controlInterval.days.splice(this.state.controlInterval.days.indexOf(day), 1)
    }
    this.updateInterval(this.state.controlInterval, (data) => {
      this.setState({controlInterval: this.state.controlInterval})
    })
  }

  render() {
    return (
      <div style={styles.container}>
        <List style={styles.item}>
          <Subheader>Polling interval</Subheader>
          {this.state.pollingInterval &&
            <ListItem>
              <IntervalSlider 
                maxValue={480} 
                unit="min" 
                value={this.state.pollingInterval.value} 
                onChange={this.onChangePollingValue.bind(this)} />
            </ListItem>
          }
        </List>
        <List style={styles.item}>
          <Subheader>Open valve time</Subheader>
          {
            this.state.controlInterval &&
            <ListItem>
              <IntervalSlider 
                maxValue={200} 
                unit="min" 
                value={this.state.controlInterval.value} 
                onChange={this.onChangeControlValue.bind(this)} />
            </ListItem>
          }
        </List>
        <Divider />
        <List style={styles.item}>
          <Subheader>Open valve hour</Subheader>
          {
            this.state.controlInterval &&
            <ListItem>
              <TimePicker 
                onChange={this.onChangeControlHour.bind(this)}
                name="hour" 
                value={this.state.controlInterval.date} />
            </ListItem>
          }
        </List>
        <Divider />
        <List style={styles.item}>
          <Subheader>Forces to open the valve</Subheader>
          {
            this.state.controlInterval &&
            <ListItem>
              <Toggle
                style={styles.toggle}
                onToggle={this.onChangeForceOpen.bind(this)}
                toggled={this.state.controlInterval.forceOpen}
              />
            </ListItem>
          }
        </List>
        <Divider />
        <List style={styles.item}>
          <Subheader>Open valve days</Subheader>
          {this.state.controlInterval &&
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
                      checked={this.state.controlInterval.days.includes(i + 1)}
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