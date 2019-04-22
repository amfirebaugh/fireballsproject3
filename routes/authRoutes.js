const router = require('express').Router();

// auth requires:
const jwt = require('express-jwt'); // Validate JWT and set req.user
const jwksRSA = require('jwks-rsa'); // Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint

// below is to validate JWT scopes, and could be needed for future dev of this project, but for now not being used
// const checkScope = require('express-jwt-authz');

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

// not using yet
router.get('/users', checkJwt, function(req, resp) {
  resp.send('User is logged in. JWT is checked.');
  console.log('jwt is:' + jwt);
  // Here we want to pass up the Users to the front end so the profile page can handle other routes below
});

// right now returns user profile to console log
router.post('/signInUser', function(req, resp) {
  console.log(
    'signInUser server side Anya is the best' + JSON.stringify(req.body)
  );
  // connect to DB
  // DB. check for repeat emails and handle accordingly (if I want to...)
  resp.sendStatus(200);
});

module.exports = router;
