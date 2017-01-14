const mongoose = require('mongoose');

after(function (done) {
  require('dotenv').load({ path: '.env' });
  mongoose.connect(process.env.MONGODB_TEST_URI, function(){
      mongoose.connection.db.dropDatabase();
      done()
  });
});
