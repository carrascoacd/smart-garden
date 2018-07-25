import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const styles = {
  container: {
    display: "flex",
    justifyContent: "center"
  },
  column: {
    width: '8em',
  }
}

export default class DeviceTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherEntries: [],
    }
  }

  componentDidMount(){
    this.getWeatherEntries()
  }

  getWeatherEntries(){
    fetch(`/api/devices/${this.props.device.id}/weather_entries`).then((response)=>{
      return response.json();
    }).then((data)=>{
      this.setState({weatherEntries: data.weatherEntries})
    }).catch((err)=>{
      console.log(err);
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false} fixedHeader={false}>
            <TableRow>
              <TableHeaderColumn style={styles.column}>Created at</TableHeaderColumn>
              <TableHeaderColumn>Moisture</TableHeaderColumn>
              <TableHeaderColumn>Temperature</TableHeaderColumn>
              <TableHeaderColumn>Humidity</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows={true}>
            {
              this.state.weatherEntries.map(function(entry, i){
                return (
                  <TableRow key={i}>
                    <TableRowColumn style={styles.column}>{moment(entry.createdAt).add(-(new Date).getTimezoneOffset(), 'minutes').format('D/MM - HH:mm')}</TableRowColumn>
                    <TableRowColumn>{entry.moisture}</TableRowColumn>
                    <TableRowColumn>{entry.temperature}</TableRowColumn>
                    <TableRowColumn>{entry.humidity}</TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table> 
      </div>
    );
  }

}