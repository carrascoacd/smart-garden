import React, {Component} from 'react';
import DeviceTable from './DeviceTable.jsx';


export default class DashboardTab extends Component {
  render() {
    return (
      <div>
        <DeviceTable device={this.props.device}/>
      </div>
    );
  }
}
