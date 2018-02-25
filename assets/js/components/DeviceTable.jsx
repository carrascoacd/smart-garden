import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const styles = {
  table: {
    width: "auto", 
    tableLayout: "auto"
  },
  container: {
    display: "flex",
    justifyContent: "center"
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
        <Table fixedHeader={false} style={styles.table}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Device: {this.props.device.name}</TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Created at</TableHeaderColumn>
              <TableHeaderColumn>Moisture</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows={true}>
            {
              this.state.weatherEntries.map(function(entry, i){
                return (
                  <TableRow key={i}>
                    <TableRowColumn>{moment(entry.createdAt).format('D/MM/Y - hh:mm')}</TableRowColumn>
                    <TableRowColumn>{entry.moisture}</TableRowColumn>
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