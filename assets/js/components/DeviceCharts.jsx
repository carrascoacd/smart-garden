import React from 'react';
import {AreaChart, Legend} from 'react-easy-chart';
import 'whatwg-fetch'

const center = {
  textAlign: 'center'
}

export default class DeviceCharts extends React.Component {

  constructor(props) {
    super(props);
    const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
    this.state = {
      data: [],
      showToolTip: false, 
      windowWidth: initialWidth - 100
    }
  }

  componentDidMount() {
    this.getWeatherEntries()
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    console.log(window.innerWidth - 100)
    this.setState({windowWidth: window.innerWidth - 100});
  }

  getWeatherEntries(){
    fetch(`/api/devices/${this.props.device.id}/weather_entries`).then((response)=>{
      return response.json();
    }).then((data)=>{      
      var moistureData = this.generateMoistureChartData(data.weatherEntries)
      var voltageData = this.generateVoltageChartData(data.weatherEntries)
      this.setState({data: [moistureData, voltageData]})
    }).catch((err)=>{
      console.log(err);
    });
  }

  generateMoistureChartData(weatherEntries){
    return _.map(weatherEntries, function(entry){
      let date = moment(entry.createdAt).format('YYYY-MM-DD hh:mm:ss')
      return {x: date, y: entry.moisture}
    })
  }

  generateVoltageChartData(weatherEntries){
    return _.map(weatherEntries, function(entry){
      let date = moment(entry.createdAt).format('YYYY-MM-DD hh:mm:ss')
      return {x: date, y: entry.mainVoltage}
    })
  }

  render() {
    return (
      <div style={center}>
        <div>
          <AreaChart
            xType={'time'}
            // axes={(this.state.windowWidth) > 800 ? true : false}
            axes
            grid
            datePattern={'%Y-%M-%d %H:%m:%S'}
            areaColors={['green', 'blue']}
            tickTimeDisplayFormat={'%m-%d %H'}
            yDomainRange={[0, 5000]}
            interpolate={'cardinal'}
            width={this.state.windowWidth * 1.35}
            height={(this.state.windowWidth) > 800 ? this.state.windowWidth / 2.2 : this.state.windowWidth}
            data={this.state.data}
          />
           <Legend
            data={[
              {key: 'M'},
              {key: 'MV'}
            ]}
            config={[
              {color: 'green'},
              {color: 'blue'}
            ]}
            dataId={'key'}
            horizontal
          />
        </div>
      </div>
    );
  }
}
