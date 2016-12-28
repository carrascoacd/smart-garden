import {LineChart} from 'react-d3-basic';
import React from 'react';

const chartData = []
for (var i = 1; i < 30; ++i){
  chartData.push({"index":i, "moisture":Math.random()})
}

const chartSeries = [
  {
    field: 'moisture',
    name: 'Moisture evolution',
    color: '#ff7f0e'
  }
]

const xAccessor = function(d) {
  return d.index;
}

export default class WeatherEntryChart extends React.Component {

  static getDefaultProps(){
    console.log("asfdg")
  }

  render() {
    return ( 
      <LineChart
        width= {700}
        height= {300}
        data= {chartData}
        chartSeries= {chartSeries}
        x= {xAccessor}
      />
    );
  }
}
