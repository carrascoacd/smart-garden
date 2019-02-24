import {AreaChart} from 'react-easy-chart';
import React from 'react';
import 'whatwg-fetch'

const center = {
  textAlign: 'center'
}

export default class DeviceCharts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      voltageData: [],
      moistureData: [],
    }
  }

  componentDidMount() {
    this.getWeatherEntries()
  }

  getWeatherEntries(){
    fetch(`/api/devices/${this.props.device.id}/weather_entries`).then((response)=>{
      return response.json();
    }).then((data)=>{
      var moistureData = this.generateMoistureChartData(data.weatherEntries)
      var voltageData = this.generateVoltageChartData(data.weatherEntries)
      this.setState({voltageData: voltageData, moistureData: moistureData})
    }).catch((err)=>{
      console.log(err);
    });
  }


  generateMoistureChartData(weatherEntries){
    return _.map(weatherEntries, function(entry){
      return {x: entry.createdAt, y: entry.moisture}
    })
  }

  generateVoltageChartData(weatherEntries){
    return _.map(weatherEntries, function(entry){
      return {x: entry.createdAt, y: entry.mainVoltage}
    })
  }

  render() {
    return (
      <div style={center}>
        <div>
          <AreaChart
            xType={'time'}
            axes
            dataPoints
            yTicks={3}
            grid
            datePattern={'%Y-%m-%dT%H:%M:%S.%LZ'}
            areaColors={['black', 'blue']}
            tickTimeDisplayFormat={'%m-%d %H'}
            axisLabels={{x: 'Dates', y: 'Moisture'}}
            yDomainRange={[0, 600]}
            interpolate={'cardinal'}
            width={1200}
            height={400}
            data={this.state.moistureData}
          />
        </div>
        <div>
          <AreaChart
            xType={'time'}
            axes
            dataPoints
            yTicks={3}
            grid
            datePattern={'%Y-%m-%dT%H:%M:%S.%LZ'}
            areaColors={['green', 'purple']}
            tickTimeDisplayFormat={'%m-%d %H'}
            axisLabels={{x: 'Dates', y: 'Voltage'}}
            yDomainRange={[0, 10]}
            interpolate={'cardinal'}
            width={1200}
            height={400}
            data={this.state.voltageData}
          />
        </div>
      </div>
    );
  }
}
