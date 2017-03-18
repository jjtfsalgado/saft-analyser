var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var	recipeController = require('./controllers/crud');


// Create our app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 4000;

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.get('/recipes', recipeController.readAll);
app.get('/recipes/:id', recipeController.readById);
app.post('/recipes', recipeController.create);
app.delete('/recipes/:id', recipeController.delete);
app.put('/recipes/:id', recipeController.update);

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
