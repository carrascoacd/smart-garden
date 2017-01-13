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
      this.setState({data : data.weatherEntryList})
      console.log(data)
    }).catch((err)=>{
      console.log("There has been an error");
    });
  }

  render() {
    return (
      <div style={center}>
        <AreaChart
          xType={'time'}
          axes
          dataPoints
          xTicks={5}
          yTicks={3}
          grid
          tickTimeDisplayFormat={'%Y-%m-%dT%H:%M:%S.%LZ'}
          interpolate={'cardinal'}
          width={800}
          height={250}
          data={this.state.data}
        />
      </div>
    );
  }
}
