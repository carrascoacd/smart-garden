import React from 'react';
import Slider from 'material-ui/Slider';

/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */
export default class RunIntervalForm extends React.Component {

  onChangeSlider(event) {
    console.log('changed', event.target.value);
  }

  render() {
    return (
      <div>
        <Slider />
        <Slider defaultValue={0.5} onChange={this.onChangeSlider} />
        <Slider defaultValue={1} onChange={this.onChangeSlider}/>
      </div>
    );
  }
}