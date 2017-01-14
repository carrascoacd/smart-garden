import {AreaChart} from 'react-easy-chart';
import React from 'react';
import 'whatwg-fetch'

const center = {
  textAlign: 'center'
}

export default class DevicesChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this.getDeviceList()
  }

  getDeviceList(){
    fetch('/api').then((response)=>{
      return response.json();
    }).then((data)=>{
      var chartData = this.generateUniqueChartData(data.deviceList)
      this.setState({data : chartData})
      console.log(data)
    }).catch((err)=>{
      console.log(err);
    });
  }

  generateUniqueChartData(deviceList){
    var chartData = _.map(deviceList, function(device){
      return _.map(device.weatherEntries, function(entry){
        return {x: entry.createdAt, y: entry.moisture}
      })
    })
    console.log(chartData)
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
          datePattern={'%Y-%m-%dT%H:%M:%S.%LZ'}
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
