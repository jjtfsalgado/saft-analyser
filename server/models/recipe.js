const mongoose = require('mongoose');

var Recipe = mongoose.model('Recipe', {
  title:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {Recipe};
