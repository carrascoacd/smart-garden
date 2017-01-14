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
    this.getDeviceList()
  }

  getDeviceList(){
    fetch('/api/devices').then((response)=>{
      return response.json();
    }).then((data)=>{
      var moistureData = this.generateMoistureChartData(data.deviceList)
      var voltageData = this.generateVoltageChartData(data.deviceList)
      this.setState({voltageData : voltageData, moistureData: moistureData})
    }).catch((err)=>{
      console.log(err);
    });
  }

  generateMoistureChartData(deviceList){
    var chartData = _.map(deviceList, function(device){
      return _.map(device.weatherEntries, function(entry){
        return {x: entry.createdAt, y: entry.moisture}
      })
    })
    return chartData
  }

  generateVoltageChartData(deviceList){
    var chartData = _.map(deviceList, function(device){
      return _.map(device.weatherEntries, function(entry){
        return {x: entry.createdAt, y: entry.currentVoltage}
      })
    })
    return chartData
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
