const router = require('express').Router();

// auth requires:
const jwt = require('express-jwt'); // Validate JWT and set req.user
const jwksRSA = require('jwks-rsa'); // Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint
const checkScope = require('express-jwt-authz'); // Validate JWT scopes

// db require:
var db = require('../models');

// function to validate our JWTS:
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
  secret: jwksRSA.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // to prevent attackers from requesting more than 5 per minute
    jwksUri: `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer:
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  // This must match the algorithm selected in the Auth0 dashboard (currently this is the default)
  algorithms: ['RS256']
});

router.get('/users', checkJwt, function(req, resp) {
  resp.send('User is logged in. JWT is checked.');
  console.log('jwt is:' + jwt);
  // Here we want to pass up the Users to the front end so the profile page can handle other routes below
});

router.post('/signInUser', function(req, resp) {
  console.log('signInUser server side' + req.body);
  console.log('userId is: ' + req.body.sub);
  console.log('userEmail is: ' + req.body.email);
  // var userAccount = {
  //   authorization: req.body,
  //   searches: {}
  // };
  // connect to DB
  //sub: signInUserObject[0],
  // name: signInUserObject[1]
  var signInUserObject = Object.values(req.body);
  console.log(req.body);
  console.log('name is: ' + req.body.nickname);
  // console.log(db.AuthUser);
  db.AuthUser.create({
    authId: req.body.sub,
    nickName: req.body.nickname
  })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      resp.json(err);
    });
  // DB. check for repeat emails and handle accordingly (if I want to...)
  // resp.sendStatus(200);
});

module.exports = router;
