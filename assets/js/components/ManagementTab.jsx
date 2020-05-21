import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IntervalSlider from './IntervalSlider.jsx';
import MenuItem from 'material-ui/MenuItem';
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

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
  },
  order: {
    marginLeft: "1em"
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
    let bodyParams = JSON.stringify({
      interval: {
        value: interval.value * 60 * 1000, 
        execution_schedule: interval.execution_schedule,
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
    return {
      id: interval.id,
      value: interval.value / 60 / 1000,
      action: interval.action,
      index: interval.index,
      execution_schedule: interval.execution_schedule
    }
  }

  onChangeIndex(event, value) {
    // Exchange indexes
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
    this.setState({interval: this.state.interval})
    this.updateInterval(this.state.interval, (data) => {
      
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

  onChangeExecutionSchedule(event, value){
    this.state.interval.execution_schedule = value
    this.setState({interval: this.state.interval}, function(){
      this.state.interval.execution_schedule = value.trim()
      this.updateInterval(this.state.interval)
    })
  }

  getNextExecution(){
    try{
      let date_utc = cron_parser.parseExpression(this.state.interval.execution_schedule).next().toString()
      return moment(date_utc).tz("Europe/Madrid").format("dd HH:mm");
    } catch (err) {
      return "Format error"
    }
  }

  render() {
    return (
      <div style={styles.container}>
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
              <SelectField
                value={this.state.interval.index}
                onChange={this.onChangeIndex.bind(this)}
              >
                {
                  this.state.intervals.map(function(interval, i){
                    return (
                      <MenuItem value={interval.index} primaryText={ interval.index + 1 } />
                    )
                  }, this)
                }
              </SelectField>
            </ListItem>
          }
        </List>
        <Divider />
        
        {
          this.state.interval &&
          <List style={styles.item}>
            <Subheader>Next: { this.getNextExecution() }</Subheader> 
            <Subheader>second | minute | hour | day (m) | month | day (w) </Subheader> 
            <ListItem>
              <TextField
                id="schedule"
                value={this.state.interval.execution_schedule}
                onChange={this.onChangeExecutionSchedule.bind(this)}
              />
            </ListItem>
          </List>
        }
       
      </div>
    );
  }
}