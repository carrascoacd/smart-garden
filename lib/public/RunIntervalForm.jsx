import React from 'react';
import Slider from 'material-ui/Slider';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */
export default class RunIntervalForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstSlider: 1,
      secondSlider: 50,
    };
  }

  handleFirstSlider(event, value) {
    this.setState({firstSlider: value});
  };

  handleSecondSlider(event, value) {
    this.setState({secondSlider: value});
  };

  render() {
    return (
      <div>
        <p>
          <span>{'The value of the first slider is: '}</span>
          <span>{this.state.firstSlider}</span>
          <span>{' - The value of the second slider is: '}</span>
          <span>{this.state.secondSlider}</span>
        </p>
        <Slider value={this.state.firstSlider} min={1} max={72} onChange={this.handleFirstSlider} />
        <Slider value={this.state.secondSlider} min={1} max={72} onChange={this.handleSecondSlider} />
        <TimePicker hintText="12hr Format" />
      </div>
    );
  }
}