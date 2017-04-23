var _ = require('underscore')

class DeviceMapper {
  
  static mapping = {n: "name", we: "weatherEntries", cv: "currentVoltage", m: "moisture"};

  static map(data, result=null) {
    if (data.constructor == Array){
      result = [];
      for (var i = 0; i < data.length; i++){
        result.push(DeviceMapper.map(data[i]));
      }
    }
    else if (data.constructor == Object){
      result = {}
      var objectKeys = Object.keys(data);
      for (var i = 0; i < objectKeys.length; i++){
        var oldKey = objectKeys[i];
        var newKey = mapping[oldKey] || oldKey;
        result[newKey] = DeviceMapper.map(data[oldKey])
      }
    }
    else {
      result = data;
    }
    return result;
  }
}

module.exports = DeviceMapper;