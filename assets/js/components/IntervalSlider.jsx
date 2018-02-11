import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

const styles = {
  container: {
    "display": "flex",
    "alignItems": "center",
    "flexDirection": "column"
  },
  slider: {
    height: 250
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

  defaultProps() {
    return {
      name: "Slider",
      unit: "s"
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
        <div>
          <Slider 
            min={0}
            max={100}
            step={1}
            style={styles.slider}
            axis="y" 
            defaultValue={50}
            onChange={this.handleChange.bind(this)} 
            onDragStop={this.saveValue.bind(this)}
            />
        </div>
        <div style={styles.value}>{this.props.name} {this.state.value} {this.props.unit}</div>
      </div>
    )
  }
}
