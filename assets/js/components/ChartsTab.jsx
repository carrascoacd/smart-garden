import React, {Component} from 'react';
import DeviceCharts from './DeviceCharts.jsx';


export default class ChartsTab extends Component {
  render() {
    return (
      <div>
        <DeviceCharts device={this.props.device}/>
        {/* <MediaQuery query='(min-device-width: 1224px)'>
          <DeviceCharts/>
        </MediaQuery> */}
      </div>
    );
  }
}
