const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  authId: {
    type: String,
    unique: true
  },
  nickName: {
    type: String,
    unique: false
  },
  drugDetails: [
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
