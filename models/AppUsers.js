const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user schema, includes object ids from drugdetails
var UserSchema = new Schema({
  id: String,
  email: String,
  Authorization: Object,
  drugs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DrugDetails'
    }
  ]
});

const AppUsers = mongoose.model('AppUsers', UserSchema);
module.exports = AppUsers;
