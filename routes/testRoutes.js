const unirest = require('unirest');
const axios = require('axios');
const router = require('express').Router();

/* API CALL GET DRUG NAME */
router.post('/getDrug', (req, res) => {
  //console.log('req query is', req.body);
  let drug = Object.values(req.body);
  //console.log(test[0]);

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
// then(({ data: { results } }) => res.json(results))

//////////////////////////////////////////////////////////////////////////////////////////////

router.post('/signInUser', function(req, resp) {
  console.log(
    'signInUser server side Anya is the best' + JSON.stringify(req.body)
  );
  // connect to DB
  // DB. check for repeat emails and handle accordingly (if I want to...)
  resp.sendStatus(200);
});

/* API CALL GET DRUG INTERACTION */
router.post('/interaction', function(req, res) {
  let drugnames = Object.values(req.body);
  console.log(drugnames);
  // need to get age and sex from user table
  // This array is initialized as empty but will be filled in with the symptoms that are common to both the user's age and gender
  // var mostLikelySymptoms = '';
  // var otherPossibleSymptoms = '';
  // var symptomResponseArr = [];

  // Initialize Keys
  // var age;
  // var gender;

  // db.User.findAll({
  //   // find all drugs associated with user
  //   include: [db.Drug],
  //   // this where points to User
  //   where: { email: req.body.email },

  // }).then(results => {

  //   age = results[0].dataValues.age
  //   gender = results[0].dataValues.sex

  // });

  // save drug combo to db
  // sequelize does not need to have an explicit join as does SQL.  Tested with invalid email and constraint was enforced.
  // var drugCombo = req.body.name1 + '-' + req.body.name2 + '-' + req.body.email;
  // console.log(drugCombo);
  // db.Drug.create({ drugname1: req.body.name1, drugname2: req.body.name2, drugCombo, UserEmail: req.body.email });
  // // api call to get drug interaction, return data to calling form
  // console.log('in api interaction', req.body);

  var queryUrl =
    'https://www.ehealthme.com/api/v1/drug-interaction/' +
    drugnames[0] +
    '/' +
    drugnames[1] +
    '/';
  axios.get(queryUrl).then(function(response) {
    console.log(response.data);
    res.json(response.data);
  });
  //try {
  // response tested as functional using 'zoloft' and 'acetaminophen'
  // console.log('age is',age)
  // console.log('gender is',gender)
  // test = response;
  // //console.log('test is', test.data.age_interaction)
  // for (var i = 0; i < test.data.age_interaction[age].length; i++) {
  //   for (
  //     var j = 0;
  //     j < test.data.gender_interaction[gender].length;
  //     j++
  //   ) {
  //     if (
  //       test.data.age_interaction[age][i] ===
  //       test.data.gender_interaction[gender][j]
  //     ) {
  //       mostLikelySymptoms += test.data.age_interaction[age][i] + ' || ';
  //             }
  //           }
  //         }
  //         //console.log('most likey symptoms', mostLikelySymptoms);
  //         symptomResponseArr.push(mostLikelySymptoms);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     })
  //     .then(function() {
  //       try {
  //         for (var i = 0; i < test.data.age_interaction[age].length; i++) {
  //           for (var j = 0; j < mostLikelySymptoms.length; j++) {
  //             if (test.data.age_interaction[age][i] !== mostLikelySymptoms[j]) {
  //               if (
  //                 !otherPossibleSymptoms.includes(
  //                   test.data.age_interaction[age][i]
  //                 )
  //               ) {
  //                 otherPossibleSymptoms +=
  //                   test.data.age_interaction[age][i] + ' || ';
  //               }
  //             }
  //           }
  //         }
  //         for (var i = 0; i < test.data.gender_interaction[gender].length; i++) {
  //           for (var j = 0; j < mostLikelySymptoms.length; j++) {
  //             if (
  //               test.data.gender_interaction[gender][i] !== mostLikelySymptoms[j]
  //             ) {
  //               if (
  //                 !otherPossibleSymptoms.includes(
  //                   test.data.gender_interaction[gender][i]
  //                 )
  //               ) {
  //                 otherPossibleSymptoms +=
  //                   test.data.gender_interaction[gender][i] + ' || ';
  //               }
  //             }
  //           }
  //         }
  //         //console.log('other possible symptoms', otherPossibleSymptoms);
  //         symptomResponseArr.push(otherPossibleSymptoms);
  //         console.log('Array', symptomResponseArr);

  //         // return data to calling function
  //         res.json(symptomResponseArr);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     })
  //     .catch(function(err) {
  //       console.log('there is an error', err);
  //       res.send('500 Error');
  //     });
}); // END INTERACTION API

module.exports = router;
