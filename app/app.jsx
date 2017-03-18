var React = require('react');
var ReactDOM = require('react-dom');

var AppRecipe = require('./components/app-recipe');

//Load foundation
$(document).foundation();

//App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <AppRecipe/>,
  document.getElementById('app')
);
