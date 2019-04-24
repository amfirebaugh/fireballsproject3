const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: {
    type: String,
    unique: true
  },
  drugInfo: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DrugDetails'
    }
  ]
});

//
//   email: String,
//   authorization: Object,
//   UIInfo:

const AuthUser = mongoose.model('AuthUser', UserSchema);

module.exports = AuthUser;
