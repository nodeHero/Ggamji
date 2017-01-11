// Word model
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var WordSchema = new Schema({
  _id: String,
  name: String,
  meaning: String
});

WordSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Word', WordSchema);

