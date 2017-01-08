const mongoose = require('mongoose');

after(function (done) {
  mongoose.connect('mongodb://localhost/test', function(){
      mongoose.connection.db.dropDatabase();
      done()
  });
});
