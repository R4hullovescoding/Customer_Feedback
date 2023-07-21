const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model("user");
exports.initializingPassport=(passport)=>{
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      // console.log(username," ",password);
      try {
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
          return done(null, false);
        }
        if (user.password !== password) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id); // form user first time//sign up
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // export data from session from mongoDB server
      done(null, user);
    } catch (error) {
      console.log(error);
      done(error,false);
    }
  });
  
}
