const unirest = require('unirest');
const axios = require('axios');
const router = require('express').Router();

//  require DB
var db = require('../models');

//////////////////////////////////////////////////////////////////////////////////////////////

/* MongoDB request for saved searches associated with
  authenticated user.  Populates the saved searches table in the UI
  sub[0] is user's ID */
router.post('/savedSearches', (req, res) => {
  let sub = Object.values(req.body);
  //console.log('vls', sub[0]);
  db.AuthUser.find({ authId: sub[0] })
    .populate('drugDetails')
    .then(function(results) {
      // console.log the drugDetails array
      res.json(results[0].drugDetails);
      console.log('saved search results are', results);
    })
    .catch(err => {
      console.log('error loading saved search results', err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////

/* API Call to get drugnames for interaction form input */
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

/* API Call to get drug interactions */

/* 
  this route is conditional.
  condition 1:  authId = 'table', meaning the interaction search was initiated from the saved
                seaches table.  There is no MongoDB interaction with this execution as it works
                off of data in the UI provided by DB query resulst on component load
  
  condition 2:  authId = 'sub id' from google. This interaction search is initiated by the drug search form
                and the DB search criteria is checked agains the DB.  New searches are saved to DB.  If
                searched was saved to the DB in a prior exercise, the DB save is skipped.

*/

router.post('/interaction', function(req, res) {
  let drugnames = Object.values(req.body);

  /*
  drugnames array values from object method used in searches below
  drug1 --> dAlpha[0]
  drug2 --> dAlpha[1]
  age --> drugnames[2]
  gender --> drugnames[3]
  sub --> drugnames[4]
  */

  // data buckets for age and symptom manipulation
  let mostLikelySymptoms = [];
  let otherPossibleSymptoms = '';
  let symptomResponseArr = [];
  //NOTE: cannot have any spaces in 'age'
  let age = drugnames[2];
  let gender = drugnames[3];
  let sub = drugnames[4];

  //**** DRUGS NAMES PLACED IN AN INTERMEDIATE ARRAY AND SORTED ALPHABETICALLY, REVERSE - SEARCHES SHOULD ALWAYS BE IN SAME ORDER ****//
  let dAlpha = [];
  dAlpha.push(drugnames[0], drugnames[1]);
  dAlpha.sort().reverse();

  ///// if 'sub' refers to 'table', then search was initialted from UI saved saearches and DB interaction is skipped.
  if (sub === 'table') {
    // if seach comes from table, skip down to interactionQuery, no DB interaction needed
    console.log('sub is', sub);
    interactionQuery();
  } else {
    ///// search intiated from input form and checked against DB, and saved to DB if necessary
    //find a matching drug combo in the DrufDetails DB
    db.DrugDetails.find({
      drug1: dAlpha[0],
      drug2: dAlpha[1],
      ageRange: age,
      sex: gender
    })
      .then(dbDrugFind => {
        console.log('dbDrugFind is', dbDrugFind);
        // if this combo is not in DrugDetails DB at all, enter it and associate with this user
        if (dbDrugFind.length === 0) {
          db.DrugDetails.create({
            drug1: dAlpha[0],
            drug2: dAlpha[1],
            ageRange: age,
            sex: gender
          })
            .then(dbDrugSaved => {
              console.log('saved drug is', dbDrugSaved);
              return db.AuthUser.findOneAndUpdate(
                { authId: sub },
                // update the drug array (schema) by pushing drug, else will overwrite previous entry
                { $push: { drugDetails: dbDrugSaved.id } },
                { new: true }
              ); // end update
            })
            .then(dbUser => {
              console.log('saved to user ', dbUser);
              // run interaction query
              interactionQuery();
            })
            .catch(err => {
              console.log('error saving and associating drug with user', err);
            }); // end update user
        } else {
          // if combo exists in DrugsDetails DB, get current user and check if combo already recorded for that user
          console.log(
            'drug already in DB, checking to see if current user has it recorded'
          );
          db.AuthUser.find({ authId: sub })
            .populate('drugDetails')
            .then(function(results) {
              // results array has a single object with sub-objects
              let idDrugs = results[0].drugDetails;
              // set inital matchCounter
              let matchCount = 0;
              console.log('idDrugs are', idDrugs);
              // loop through array of drugs and inspect each object
              for (var i = 0; i < idDrugs.length; i++) {
                if (
                  // all conditions must be met in each object
                  idDrugs[i].drug1 === dAlpha[0] &&
                  idDrugs[i].drug2 === dAlpha[1] &&
                  idDrugs[i].ageRange === age &&
                  idDrugs[i].sex === gender
                ) {
                  // match found!
                  matchCount++;
                }
              }
              console.log('current matchCount is', matchCount);
              // if matchCount still 0, update DrugsDetails for this user
              if (matchCount === 0) {
                console.log(
                  'Current user does not have drug associated, saving drug to user'
                );
                db.DrugDetails.create({
                  drug1: dAlpha[0],
                  drug2: dAlpha[1],
                  ageRange: age,
                  sex: gender
                })
                  .then(dbDrugSaved => {
                    console.log('saved drug is', dbDrugSaved);
                    return db.AuthUser.findOneAndUpdate(
                      { authId: sub },
                      // update the drug array (schema) by pushing drug, else will overwrite previous entry
                      { $push: { drugDetails: dbDrugSaved.id } },
                      { new: true }
                    ); // end update
                  })
                  .then(dbUser => {
                    console.log('saved to user ', dbUser);
                    // run interaction query
                    interactionQuery();
                  })
                  .catch(err => {
                    console.log(
                      'error updating user user with drugs for combo already in DB for another user',
                      err
                    );
                  }); // end update user;
              } else {
                console.log('user already has this combo recorded');
                // run interaction query
                interactionQuery();
              } // end if for matchCount
            }); // end promise for drug pre-existing in db
        } // end outer else
      })
      .catch(err => {
        console.log('error finding drug associated with user', err);
      }); // end find user for drug combo entered
  } // end main else

  function interactionQuery() {
    // run API for interaction
    var queryUrl =
      'https://www.ehealthme.com/api/v1/drug-interaction/' +
      dAlpha[0] +
      '/' +
      dAlpha[1] +
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
                mostLikelySymptoms.push(test.data.age_interaction[age][i]);
              }
            }
          }
          // console.log('results length: ' + mostLikelySymptoms.length);
          // console.log('results length / 4: ' + mostLikelySymptoms.length / 4);
          // console.log(
          //   'results length / 4 ROUNDED: ' +
          //     Math.floor(mostLikelySymptoms.length / 4)
          // );
          // console.log(
          //   'results length / 4 + 1: ' +
          //     Math.floor(mostLikelySymptoms.length / 4 + 1)
          // );
          // console.log('most likey symptoms *......*', mostLikelySymptoms);
          symptomResponseArr.push(mostLikelySymptoms);
        } catch (err) {
          console.log('error processing query', err);
          //!!! ALL EMPTY OBJECTS WILL FAIL HERE !!!////
          resp.json('Error');
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
          for (
            var i = 0;
            i < test.data.gender_interaction[gender].length;
            i++
          ) {
            for (var j = 0; j < mostLikelySymptoms.length; j++) {
              if (
                test.data.gender_interaction[gender][i] !==
                mostLikelySymptoms[j]
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

          // return data to calling function on FRONT END
          res.json(symptomResponseArr);
        } catch (err) {
          console.log(err);
          // res.send('Error');
        }
      })
      .catch(function(err) {
        console.log('there is an error', err);
        res.json('500');
      });
  } // END Interaction Query Function
}); // END INTERACTION API

module.exports = router;
