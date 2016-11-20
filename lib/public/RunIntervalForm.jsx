import React from 'react';
import Slider from 'material-ui/Slider';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
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

  handleFirstSlider = (event, value) => {
    this.setState({firstSlider: value});
  };

  handleSecondSlider = (event, value) => {
    this.setState({secondSlider: value});
  };


  render() {
    return (
      <div>
        <p>
          <span>{'Each '}</span>
          <span>{this.state.firstSlider}</span>
          <span>{' hours and '}</span>
          <span>{this.state.secondSlider}</span>
          <span>{' minutes'}</span>
        </p>
        <Slider value={this.state.firstSlider} min={0} max={72} step={1} onChange={this.handleFirstSlider} />
        <Slider value={this.state.secondSlider} min={0} max={120} step={1} onChange={this.handleSecondSlider} />
        <span><DatePicker hintText="Start date"/></span>
        <span><TimePicker hintText="Start time"/></span>
        <span><DatePicker hintText="End date"/></span>
        <span><TimePicker hintText="End time"/></span>
      </div>
    );
  }
}