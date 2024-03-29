import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import {userModel} from "../models/Models.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await userModel.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "no existe el Usuario." });
      }

      // Match Password's User
      const isMatch = await user.matchPassword(password);
      console.log(isMatch);
      if (!isMatch)
        return done(null, false, { message: "Password incorrecta." });
      
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id, (err, user) => {
    done(err, user);
  });
});
