const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  authorization: Object,
  searches: Array
});

//   userId: {
//     type: String,
//     unique: true
//   },
//   email: String,
//   authorization: Object,
//   UIInfo: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'DrugDetails'
//     }
//   ]

const User = mongoose.model('User', UserSchema);

module.exports = User;
