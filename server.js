const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

// mongo additions
const mongoose = require('mongoose');

const apiRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Define API routes here
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// mongo DB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/drugRXTest1', {
  useNewUrlParser: true,
  useFindAndModify: false
});

// test connection via callback
/* once => listen one time
on => listen everytime
*/
mongoose.connection
  .once('open', function() {
    console.log('connection made!!!!');
    // lets mocha know connection is done
    // done();
  })
  .on('error', function(error) {
    console.log('connection error: make sure mongo is running!!!');
  });
// end DB connection

// Start Server
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
