'use strict';

let express = require('express');

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

app.listen(app.get('port'));