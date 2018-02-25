import React, {Component} from 'react';
import DeviceCharts from './DeviceCharts.jsx';
import DeviceTable from './DeviceTable.jsx';


export default class DashboardTab extends Component {
  render() {
    return (
      <div>
        <DeviceTable device={this.props.device}/>
        {/* <MediaQuery query='(min-device-width: 1224px)'>
          <DeviceCharts/>
        </MediaQuery> */}
      </div>
    );
  }
}