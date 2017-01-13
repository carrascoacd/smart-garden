import React from 'react';
import Slider from 'material-ui/Slider';
import BottomNavigationBar from './BottomNavigationBar.jsx';
import WeatherEntryChart from './WeatherEntryChart.jsx';


const weatherEntryList = [
          [
            { x: '1-Jan-15', y: 20 },
            { x: '1-Feb-15', y: 10 },
            { x: '1-Mar-15', y: 33 },
            { x: '1-Apr-15', y: 45 },
            { x: '1-May-15', y: 15 }
          ], [
            { x: '1-Jan-15', y: 10 },
            { x: '1-Feb-15', y: 15 },
            { x: '1-Mar-15', y: 13 },
            { x: '1-Apr-15', y: 15 },
            { x: '1-May-15', y: 10 }
          ]
        ]

export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <WeatherEntryChart weatherEntryList={weatherEntryList}/>
        <BottomNavigationBar />
      </div>
    );
  }
}