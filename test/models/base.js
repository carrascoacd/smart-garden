const mongoose = require('mongoose');

after(function (done) {
  require('dotenv').load({ path: '.env.test' });
  mongoose.connect(process.env.MONGODB_URI, function(){
      mongoose.connection.db.dropDatabase();
      done()
  });
});
