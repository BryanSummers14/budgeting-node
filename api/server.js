const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('../config');

const app = express();

var uri = `mongodb://${config.username}:${config.password}@ds261828.mlab.com:61828/budget-app`;

mongoose.Promise = global.Promise;
mongoose.connect(uri);

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

// Routes
const authRoutes = require('./routes/auth.routes')();
const budgetRoutes = require('./routes/budget.routes')();

app.route('/').get(function(req, res) {
    res.json({message: 'Hello World'});
});

app.use('/api/auth', authRoutes);
app.use('/api/budget', budgetRoutes);

app.listen(port, _ => {
    console.log(`Budget app listening on: ${port}`);
})