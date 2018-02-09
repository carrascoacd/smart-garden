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
      <div>
        {
          this.state.deviceList.map(function(device, i){
            return (
              <Table key={i}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Device: {device.name}</TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    <TableHeaderColumn>Created at</TableHeaderColumn>
                    <TableHeaderColumn>Moisture</TableHeaderColumn>
                    <TableHeaderColumn>Voltage</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} stripedRows={true}>
                  {
                    device.weatherEntries.slice(0, 10).map(function(entry, i){
                      return (
                        <TableRow key={i}>
                          <TableRowColumn>{moment(entry.createdAt).format('dd hh:mm:ss')}</TableRowColumn>
                          <TableRowColumn>{entry.moisture}</TableRowColumn>
                          <TableRowColumn>{entry.currentVoltage}</TableRowColumn>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            )
          })
        }
      </div>
    )
  }

}