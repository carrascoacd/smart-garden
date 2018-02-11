import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

const styles = {
  container: {
    "display": "flex",
    "alignItems": "center",
    "flexDirection": "column"
  },
  horizontalSlider: {
    width: 250
  },
  verticalSlider: {
    height: 250
  },
  value: {
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

  saveValue(event, value){
    console.log("Saving...");
  }

  render(){
    const sliderStyle = this.props.axis == "x" ? styles.horizontalSlider : styles.verticalSlider;
    return (
      <div style={styles.container}>
        <div style={styles.value}>{this.props.name} {this.state.value} {this.props.unit}</div>
        <div>
          <Slider 
            min={0}
            max={100}
            step={1}
            axis={this.props.axis}
            style={sliderStyle}
            defaultValue={50}
            onChange={this.handleChange.bind(this)} 
            onDragStop={this.saveValue.bind(this)}
            />
        </div>
      </div>
    )
  }
}
