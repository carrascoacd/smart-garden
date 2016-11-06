import React from 'react';
import Slider from 'material-ui/Slider';
import BottomNavigationBar from './BottomNavigationBar.jsx';
import RunIntervalForm from './RunIntervalForm.jsx';
import WeatherEntryList from './WeatherEntryList.jsx';

export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <RunIntervalForm />
        <WeatherEntryList weatherEntryList={[]}/>
        <BottomNavigationBar />
      </div>
    );
  }
}