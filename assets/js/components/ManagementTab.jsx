import React, {Component} from 'react';
import TimePicker from 'material-ui/TimePicker';
import IntervalSlider from './IntervalSlider.jsx'


const styles = {
  container: {
    "display": "flex",
    "alignItems": "center",
    "flexDirection": "column",
  },
  nestedContainer: {
    "display": "flex",
    "flexDirection": "row",
    "width": "256px",
  },
  item: {
    "flexGrow": 1
  }
}

export default class ManagementTab extends Component {

  constructor(props){
    super(props);
    this.state = {
      action: "open-valve",
      periodicity: null
    }
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
        <div style={styles.item}>
          <TimePicker
            hintText="Open valve at"
            dialogBodyStyle={{overflowY: 'auto'}}
            onChange={this.setPeriodicity.bind(this)}
          />
        </div>
        <div style={styles.nestedContainer}>
          <div style={styles.item}>
            <IntervalSlider />
          </div>
          <div style={styles.item}>
            <IntervalSlider />
          </div>
        </div>
      </div>
    );
  }
}