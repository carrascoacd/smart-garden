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
    }
  }

  switchTab(index){
    this.setState({tabSelected: index});
  }

  render() {
    return (
      <div>
        {this.state.tabSelected == DASHBOARD_TAB ? (
          <DashboardTab/>
        ) : (
          <ManagementTab/>
        )}
        <BottomNavigationBar onTabChange={this.switchTab.bind(this)} />
      </div>
    );
  }
}