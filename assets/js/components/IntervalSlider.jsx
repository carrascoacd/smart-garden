import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

const styles = {
  container: {
    "display": "flex",
    "alignItems": "center",
    "flexDirection": "column"
  },
  slider: {
    width: "300px",
    height: "1em"
  }
};

export default class IntervalSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || 0,
    }
  }

  handleChange(event, value){
    this.setState({value: value})
  }

  saveValue(event){
    this.props.onChange(event, this.state.value)
  }

  render(){
    return (
      <div style={styles.container}>
        {this.props.unit == "min" ? (
          <div>{this.state.value} {this.props.unit} ({(this.state.value / 60).toFixed(2)} hours)</div>
        ) : (
          <div>{this.state.value} {this.props.unit}</div>
        )}
        <div>
          <Slider 
            min={0}
            max={this.props.maxValue}
            step={1}
            axis={"x"}
            style={styles.slider}
            value={this.state.value}
            onChange={this.handleChange.bind(this)} 
            onDragStop={this.saveValue.bind(this)}
            />
        </div>
      </div>
    )
  }
}
