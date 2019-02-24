import React, {Component} from 'react';
import DeviceCharts from './DeviceCharts.jsx';


export default class ChartsTab extends Component {
  render() {
    return (
      <div>
        <DeviceCharts device={this.props.device}/>
      </div>
    );
  }
}
