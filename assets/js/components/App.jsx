import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Layout from './Layout.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Layout/>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));