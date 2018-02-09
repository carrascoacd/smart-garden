import React, {Component} from 'react';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  "display": "flex",
  "alignItems": "center",
  "flexDirection": "column"
}

export default class ManagementTab extends Component {

  constructor(props){
    super(props);
    this.state = {
      action: "open-valve",
      periodicity: null
    }
  }

  setPeriodicity(event, date){
    console.log(date.toString());
    this.state.periodicity = date
  }

  setAction(event, index, value){
    console.log(value);
    this.setState({action: value})
  }

  render() {
    return (
      <div style={style}>
        <TimePicker
          hintText="Periodicity"
          onChange={this.setPeriodicity.bind(this)}
        /> 
        <SelectField
          floatingLabelText="Action"
          value={this.state.action}
          onChange={this.setAction.bind(this)}>
          <MenuItem value={"open-valve"} primaryText="Open Valve" />
          <MenuItem value={"close-valve"} primaryText="Close Valve" />
          <MenuItem value={"wait"} primaryText="Disable" />
        </SelectField>
        <RaisedButton 
          style={{"marginTop": "20px"}}
          label="Secondary" 
          secondary={true} />
      </div>
    );
  }
}