import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

const styles = {
  container: {
    "display": "flex",
    "alignItems": "center",
    "flexDirection": "column"
  },
  slider: {
    "height": 150
  },
  value: {
    "paddingTop": "10px"
  }
};

export default class IntervalSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    }
  }

  handleChange(event, value){
    this.setState({value: value})
  }

  render(){
    return (
      <div style={styles.container}>
        <div>
          <Slider 
            min={0}
            max={100}
            step={1}
            style={styles.slider} 
            axis="y" 
            defaultValue={50}
            onChange={this.handleChange.bind(this)} />
        </div>
        <div style={styles.value}>Value {this.state.value}</div>
      </div>
    )
  }
}
