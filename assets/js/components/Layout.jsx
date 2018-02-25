import React from 'react';
import Slider from 'material-ui/Slider';
import BottomNavigationBar from './BottomNavigationBar.jsx';
import ManagementTab from './ManagementTab.jsx';
import DashboardTab from './DashboardTab.jsx';

const DASHBOARD_TAB = 0;
const MANAGEMENT_TAB = 1;

export default class Layout extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tabSelected: DASHBOARD_TAB,
      device: null,
    }
  }

  switchTab(index){
    this.setState({tabSelected: index});
  }

  componentDidMount() {
    this.getDevice()
  }

  getDevice(){
    fetch('/api/current/device').then((response)=>{
      return response.json();
    }).then((data)=>{
      this.setState({device : data})
    }).catch((err)=>{
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        {this.state.device != null && 
          <div>
            {this.state.tabSelected == DASHBOARD_TAB ? (
              <DashboardTab device={this.state.device}/>
            ) : (
              <ManagementTab device={this.state.device}/>
            )}
            <BottomNavigationBar onTabChange={this.switchTab.bind(this)} />
          </div>
        }
      </div>
    );
  }
}