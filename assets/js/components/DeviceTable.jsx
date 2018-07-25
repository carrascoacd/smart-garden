import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const styles = {
  container: {
    display: "flex",
    justifyContent: "center"
  },
  createdAtColumn: {
    width: '6em',
  },
  dataColumn: {
    paddingLeft: '0',
    paddingRight: '0'
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
              <TableHeaderColumn style={styles.createdAtColumn}>Created at</TableHeaderColumn>
              <TableHeaderColumn style={styles.dataColumn}>Moisture</TableHeaderColumn>
              <TableHeaderColumn style={styles.dataColumn}>Temperature</TableHeaderColumn>
              <TableHeaderColumn style={styles.dataColumn}>Humidity</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows={true}>
            {
              this.state.weatherEntries.map(function(entry, i){
                return (
                  <TableRow key={i}>
                    <TableRowColumn style={styles.createdAtColumn}>{moment(entry.createdAt).add(-(new Date).getTimezoneOffset(), 'minutes').format('D/MM - HH:mm')}</TableRowColumn>
                    <TableRowColumn style={styles.dataColumn}>{entry.moisture}</TableRowColumn>
                    <TableRowColumn style={styles.dataColumn}>{entry.temperature}</TableRowColumn>
                    <TableRowColumn style={styles.dataColumn}>{entry.humidity}</TableRowColumn>
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