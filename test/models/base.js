const mongoose = require('mongoose');

after(function (done) {
  mongoose.connect('mongodb://localhost/mydatabase', function(){
      mongoose.connection.db.dropDatabase();
      done()
  });
});
