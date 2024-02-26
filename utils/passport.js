import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { LOGIN_TYPES} from "./constants.js";
import { createUser, findUser } from "../models/user.model.js";
import dotenv from "dotenv"
dotenv.config()
  passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function(accessToken, refreshToken, profile, cb) {
      createUser({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));
 