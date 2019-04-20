const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schemas and Model
// (Allie notes) like the "book"
const ComboSchema = new Schema({
  drug1: String,
  drug2: String
});

// drugCombos are an array of ComboSchema Objects
// (Allie notes) like the "author"
const UserDrugSchema = new Schema({
  id: Number,
  name: String,
  age: Number,
  drugCombos: [ComboSchema]
});

/*
Sample User Document in Collection
{
  // below whatever we absolutely need to initiate a user...so bare minimum is _id, or something similar, probably email just to make sure it's "backed up" somewhere? idk?
  Auth: {
    _id: 83265qwpnsq233,
    email: "johndoe@email.com",
    name: "Jon Doe"
  },

  UI: {
    ageRange: 30-39,
    sex: male,
    drugCombos: [
        {drug1: 'Zoloft', drug2: 'Ibuprofen'},
        {drug1: 'Lipitor', drug2: 'Paxil'}
    ]
  }
}

*/

// create data model (collection)
/* 
    Everytime a new user is created, the user will be created in 
    this collection (UserDrug) based on this schema (UserDrugSchema)
*/
const UserDrug = mongoose.model('userdrug', UserDrugSchema);

module.exports = UserDrug;
