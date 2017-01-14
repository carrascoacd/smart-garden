import React from 'react';
import Slider from 'material-ui/Slider';
import BottomNavigationBar from './BottomNavigationBar.jsx';
import DevicesChart from './DevicesChart.jsx';


export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <DevicesChart/>
        <BottomNavigationBar />
      </div>
    );
  }
}