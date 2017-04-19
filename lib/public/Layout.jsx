import React from 'react';
import Slider from 'material-ui/Slider';
import BottomNavigationBar from './BottomNavigationBar.jsx';
import DeviceCharts from './DeviceCharts.jsx';
import DeviceTable from './DeviceTable.jsx';


export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <DeviceTable/>
        <DeviceCharts/>
        <BottomNavigationBar />
      </div>
    );
  }
}