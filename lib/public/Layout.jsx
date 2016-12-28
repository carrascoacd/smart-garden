import React from 'react';
import Slider from 'material-ui/Slider';
import BottomNavigationBar from './BottomNavigationBar.jsx';
import WeatherEntryChart from './WeatherEntryChart.jsx';
import WeatherEntryList from './WeatherEntryList.jsx';

export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <WeatherEntryChart />
        <WeatherEntryList weatherEntryList={[]}/>
        <BottomNavigationBar />
      </div>
    );
  }
}