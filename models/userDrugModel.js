const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schemas and Model

const ComboSchema = new Schema({
  drug1: String,
  drug2: String
});

// drugCombos are an array of ComboSchema Objects
const UserDrugSchema = new Schema({
  id: Number,
  name: String,
  age: Number,
  drugCombos: [ComboSchema]
});

/*
Sample User Document in Collection
{
    id: 83265qwpnsq233,
    name: "Jon Doe"
    age: 34,
    drugCombos: [
        {drug1: 'Zoloft', drug2: 'Ibuprofen'},
        {drug1: 'Lipitor', drug2: 'Paxil'}
    ]
}

*/

// create data model (collection)
/* 
    Everytime a new user is created, the user will be created in 
    this collection (UserDrug) based on this schema (UserDrugSchema)
*/
const UserDrug = mongoose.model('userdrug', UserDrugSchema);

module.exports = UserDrug;
