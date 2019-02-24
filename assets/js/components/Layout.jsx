import React from 'react';
import BottomNavigationBar from './BottomNavigationBar.jsx';
import ManagementTab from './ManagementTab.jsx';
import DashboardTab from './DashboardTab.jsx';
import ChartsTab from './ChartsTab.jsx';

const DASHBOARD_TAB = 0;
const CHART_TAB = 1;
const MANAGEMENT_TAB = 2;

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
    let tab;
    switch(this.state.tabSelected) {
      case DASHBOARD_TAB:
        tab = <DashboardTab device={this.state.device}/>
        break;
      case MANAGEMENT_TAB:
        tab = <ManagementTab device={this.state.device}/>
        break;
      case CHART_TAB:
        tab = <ChartsTab device={this.state.device}/>
        break;
    }
    return (
      <div>
        {
          <div>
            { this.state.device != null && tab } 
            <BottomNavigationBar onTabChange={this.switchTab.bind(this)} />
          </div>
        } 
      </div>
    );
  }
}
