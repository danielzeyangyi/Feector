const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // we turn User instance into userId
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // we turning id into User mongoose instance here
  User.findById(id).then(user => {
    done(null, user);
  });
});

// create new google oauth strategy instance(with config),
// passport user use of this strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback' // call back address after user ganted google OAuth permission
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if we have this user stored already
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        done(null, existingUser); // (err, user record)
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
