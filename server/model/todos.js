var mongoose = require('mongoose');

module.exports = mongoose.model('todos', {
  name: String,
  completed: { type: Boolean, default: false }
});