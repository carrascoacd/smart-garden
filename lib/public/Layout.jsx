import React from 'react';
import Slider from 'material-ui/Slider';
import BottomNavigationBar from './BottomNavigationBar.jsx';
import WeatherEntryChart from './WeatherEntryChart.jsx';


export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <WeatherEntryChart weatherEntryList/>
        <BottomNavigationBar />
      </div>
    );
  }
}