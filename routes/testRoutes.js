const unirest = require('unirest');
const axios = require('axios');
const router = require('express').Router();

//  require DB
var db = require('../models');

/* DB REQUEST FOR ALL SAVED SEARCHES FOR USER */
// populate the saved searches for the signed in user
// sub[0] is user's ID
router.post('/savedSearches', (req, res) => {
  let sub = Object.values(req.body);
  //console.log('vls', sub[0]);
  db.AuthUser.find({ authId: sub[0] })
    .populate('drugDetails')
    .then(function(results) {
      // console.log the drug array
      console.log('saved drug search results are', results[0].drugs);
      res.json(results[0].drugs);
    })
    .catch(err => {
      console.log(err);
    });
});

/* API CALL GET DRUG NAME */
router.post('/getDrug', (req, res) => {
  let drug = Object.values(req.body);

  unirest
    .get(
      'https://iterar-mapi-us.p.rapidapi.com/api/autocomplete?query=' + drug[0]
    )
    .header(
      'X-RapidAPI-Key',
      '0xAyFD96WlmshBNnpLcUfgSrWzCvp15QZAnjsnwA8grd2AfWRB'
    )
    .end(function(results) {
      console.log(results.body.suggestions);
      // return array of drug names
      res.json(results.body.suggestions);
    });
}); // END GET DRUG NAME

//////////////////////////////////////////////////////////////////////////////////////////////

/* API CALL GET DRUG INTERACTION */
router.post('/interaction', function(req, res) {
  let drugnames = Object.values(req.body);
  console.log('drugnames object is ', drugnames);

  /*
  drugnames array values from object method used in searches below
  drug1 --> drugnames[0]
  drug2 --> drugnames[1]
  age --> drugnames[2]
  gender --> drugnames[3]
  sub --> drugnames[4]

  */

  let mostLikelySymptoms = '';
  let otherPossibleSymptoms = '';
  let symptomResponseArr = [];
  //cannot have any spaces in 'age'
  let age = drugnames[2];
  let gender = drugnames[3];
  let sub = drugnames[4];

  /* for the drug combo entered find user with matching 'sub' ID. */

  ////// find a matching combo in the DB
  db.DrugDetails.find({
    drug1: drugnames[0],
    drug2: drugnames[1],
    ageRange: age,
    sex: gender
  })
    .then(dbDrugFind => {
      console.log('dbDrugFind is', dbDrugFind);
      // if this combo is not in DB, enter it in DB for this user
      if (dbDrugFind.length === 0) {
        db.DrugDetails.create({
          drug1: drugnames[0],
          drug2: drugnames[1],
          ageRange: age,
          sex: gender
        })
          .then(dbDrugSaved => {
            console.log('saved drug is', dbDrugSaved);
            return db.AuthUser.findOneAndUpdate(
              { authId: sub },
              { drugDetails: dbDrugSaved._id }
            );
          })
          .then(dbUser => {
            console.log('saved to user ', dbUser);
          })
          .catch(err => {
            console.log('error saving and associating drug with user', err);
          }); // end update user
      }
    })
    .catch(err => {
      console.log('error finding drug associated with user', err);
    }); // end find user for drug combo entered

  // run API for interaction
  var queryUrl =
    'https://www.ehealthme.com/api/v1/drug-interaction/' +
    drugnames[0] +
    '/' +
    drugnames[1] +
    '/';

  axios
    .get(queryUrl)
    .then(function(response) {
      // TEST SHORTCUT to send data to browser console before try loop
      // res.json(response.data);

      try {
        test = response;
        for (var i = 0; i < test.data.age_interaction[age].length; i++) {
          for (
            var j = 0;
            j < test.data.gender_interaction[gender].length;
            j++
          ) {
            if (
              test.data.age_interaction[age][i] ===
              test.data.gender_interaction[gender][j]
            ) {
              mostLikelySymptoms += test.data.age_interaction[age][i] + ' || ';
            }
          }
        }
        console.log('most likey symptoms *......*', mostLikelySymptoms);
        symptomResponseArr.push(mostLikelySymptoms);
      } catch (err) {
        console.log(err);
      }
    })
    .then(function() {
      try {
        for (var i = 0; i < test.data.age_interaction[age].length; i++) {
          for (var j = 0; j < mostLikelySymptoms.length; j++) {
            if (test.data.age_interaction[age][i] !== mostLikelySymptoms[j]) {
              if (
                !otherPossibleSymptoms.includes(
                  test.data.age_interaction[age][i]
                )
              ) {
                otherPossibleSymptoms +=
                  test.data.age_interaction[age][i] + ' || ';
              }
            }
          }
        }
        for (var i = 0; i < test.data.gender_interaction[gender].length; i++) {
          for (var j = 0; j < mostLikelySymptoms.length; j++) {
            if (
              test.data.gender_interaction[gender][i] !== mostLikelySymptoms[j]
            ) {
              if (
                !otherPossibleSymptoms.includes(
                  test.data.gender_interaction[gender][i]
                )
              ) {
                otherPossibleSymptoms +=
                  test.data.gender_interaction[gender][i] + ' || ';
              }
            }
          }
        }
        // console.log('other possible symptoms *......*', otherPossibleSymptoms);
        symptomResponseArr.push(otherPossibleSymptoms);
        console.log('symptomResponseArr is returning:', symptomResponseArr);

        // return data to calling function
        res.json(symptomResponseArr);
      } catch (err) {
        console.log(err);
      }
    })
    .catch(function(err) {
      console.log('there is an error', err);
      res.json('500');
    }); // END INTERACTION API
});

module.exports = router;
