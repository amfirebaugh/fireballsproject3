const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// drug schema (included in user schema)

var DrugSchema = new Schema({
  drug1: String,
  drug2: String,
  ageRange: String,
  sex: String
});

// create data model (collection)
/* 
    Everytime a new user is created, the user will be created in 
    this collection (UserDrug) based on this schema (UserDrugSchema)
*/
const DrugDetails = mongoose.model('DrugDetails', DrugSchema);
module.exports = DrugDetails;
