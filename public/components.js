import React, {Component} from 'react';

var WeatheEntryList = React.createClass({

  render: function() {
    return (
      <div>
        Weather Entry List:
        <ul>  
          {
            this.props.weatherEntryList.map(function(weatherEntry){
              <li>Id: {weatherEntry._id}; Moisture: {weatherEntry.moisture}; Created at: {weatherEntry.createdAt}</li>
            })
          }
        </ul>
      </div>
    );
  }
})

exports.WeatheEntryList = WeatheEntryList
