import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class DeviceTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deviceList: [],
    }
  }

  componentDidMount() {
    this.getDeviceList()
  }

  getDeviceList(){
    fetch('/api/devices').then((response)=>{
      return response.json();
    }).then((data)=>{
      this.setState({deviceList : data.deviceList})
    }).catch((err)=>{
      console.log(err);
    });
  }

  render() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Created at</TableHeaderColumn>
            <TableHeaderColumn>Moisture</TableHeaderColumn>
            <TableHeaderColumn>Voltage</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            this.state.deviceList.map(function(device){
              return (
                device.weatherEntries.map(function(entry){
                  return (
                    <TableRow>
                      <TableRowColumn>{entry.createdAt}</TableRowColumn>
                      <TableRowColumn>{entry.moisture}</TableRowColumn>
                      <TableRowColumn>{entry.currentVoltage}</TableRowColumn>
                    </TableRow>
                  )
                })
              )
            })
          }
        </TableBody>
      </Table>
    )
  }

}