import React from 'react';
import Slider from 'material-ui/Slider';
import BottomNavigationBar from './BottomNavigationBar.jsx';
import DeviceCharts from './DeviceCharts.jsx';


export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <DeviceCharts/>
        <BottomNavigationBar />
      </div>
    );
  }
}