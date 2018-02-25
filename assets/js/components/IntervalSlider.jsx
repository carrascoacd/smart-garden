import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

const styles = {
  container: {
    "display": "flex",
    "alignItems": "center",
    "flexDirection": "column"
  },
  horizontalSlider: {
    width: "256px",
    paddingLeft: "16px"
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

  saveValue(event, value){
    console.log("Saving...");
  }

  render(){
    return (
      <div style={styles.container}>
        <div>{this.state.value} {this.props.unit}</div>
        <div>
          <Slider 
            min={0}
            max={this.props.maxValue}
            step={1}
            axis={"x"}
            style={styles.horizontalSlider}
            value={this.state.value}
            onChange={this.handleChange.bind(this)} 
            onDragStop={this.saveValue.bind(this)}
            />
        </div>
      </div>
    )
  }
}
