'use strict';

let express = require('express');
let path    = require('path');

let app = express();

app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('layout',
    { title : 'Home' }
  );
});

app.use('/static', express.static(__dirname + '/public'));
console.log(express.static(__dirname + '../build'));
app.use('/js', express.static(path.join(__dirname, '..', 'build')));

app.listen(app.get('port'), function() {
  console.log('Server has started');
});