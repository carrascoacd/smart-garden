import React from 'react';
import Slider from 'material-ui/Slider';
import BottomNavigationBar from './BottomNavigationBar.jsx';
import DeviceCharts from './DeviceCharts.jsx';
import DeviceTable from './DeviceTable.jsx';
import MediaQuery from 'react-responsive';


export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <DeviceTable/>
        <MediaQuery query='(min-device-width: 1224px)'>
          <DeviceCharts/>
        </MediaQuery>
        <BottomNavigationBar />
      </div>
    );
  }
}