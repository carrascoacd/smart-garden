import {AreaChart} from 'react-easy-chart';
import React from 'react';


const center = {
  textAlign: 'center'
}

export default class WeatherEntryChart extends React.Component {

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
          tickTimeDisplayFormat={'%d %m %y'}
          interpolate={'cardinal'}
          width={800}
          height={250}
          data={this.props.weatherEntryList}
        />
      </div>
    );
  }
}
