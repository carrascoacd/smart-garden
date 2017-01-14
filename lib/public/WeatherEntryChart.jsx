import {AreaChart} from 'react-easy-chart';
import React from 'react';
import 'whatwg-fetch'

const center = {
  textAlign: 'center'
}

export default class WeatherEntryChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this.getWeatherEntryList()
  }

  getWeatherEntryList(){
    fetch('/api').then((response)=>{
      return response.json();
    }).then((data)=>{
      var chartData = this.generateUniqueChartData(data.weatherEntryList)
      this.setState({data : chartData})
      console.log(data)
    }).catch((err)=>{
      console.log(err);
    });
  }

  generateUniqueChartData(weatherEntryList){
    var chartData = _.map(weatherEntryList, function(weatherEntryChart){
      return _.map(weatherEntryChart, function(entry){
        return {x: entry.createdAt, y: entry.moisture}
      })
    })    
    return chartData
  }

  render() {
    return (
      <div style={center}>
        <AreaChart
          xType={'time'}
          axes
          dataPoints
          yTicks={3}
          grid
          datePattern={'%Y-%m-%dT%H:%M:%S'}
          areaColors={['black', 'purple']}
          tickTimeDisplayFormat={'%m-%d %H'}
          interpolate={'cardinal'}
          width={1200}
          height={400}
          data={this.state.data}
        />
      </div>
    );
  }
}
