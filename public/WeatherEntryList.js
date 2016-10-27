import React from 'react';

export default class WeatheEntryList extends React.Component {

  render() {
    return (
      <div>
        Weather Entry List ({this.props.weatherEntryList.length}):
        <ul>  
          {
            this.props.weatherEntryList.map(function(weatherEntry){
              return <li key={weatherEntry._id.toString()}>Moisture: {weatherEntry.moisture}; Created at: {weatherEntry.createdAt.toString()}; Id: {weatherEntry._id.toString()}</li>
            })
          }
        </ul>
      </div>
    );
  }
}

// https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app

// if (typeof exports !== 'undefined'){
//   exports.WeatheEntryList = WeatheEntryList
// }
