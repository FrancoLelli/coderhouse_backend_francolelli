import passport from "passport";
import GithubStrategy from "passport-github2";
import LocalStrategy from "passport-local";
import userModel from "../dao/models/users_models.js";
import { createHash, isValidPassword } from "../utils.js";

const initializedPassport = () => {
  passport.use(
    "signupStrategy",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const { name, age } = req.body;
          const user = await userModel.findOne({ email: username });
          if (user) {
            return done(null, false);
          }

          //Si no existe en DB
          const newUser = {
            name,
            age,
            email: username,
            password: createHash(password),
          };

          const userCreated = await userModel.create(newUser);
          return done(null, userCreated);
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.use(
    "githubSignup",
    new GithubStrategy(
      {
        clientID: "Iv1.daf98b3385ab7616",
        clientSecret: "72a876f8b847a42c9cb39b504b474222efc9aa1e",
        callbackURL: "http://localhost:8080/api/sessions/github-callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userExist = await userModel.findOne({
            email: profile.username,
          });
          if (userExist) {
            return done(null, userExist);
          }
          const newUser = {
            name: profile.displayName,
            age: null,
            email: profile.username,
            password: createHash(profile.id),
          };
          const userCreated = await userModel.create(newUser);
          return done(null, userCreated);
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    return done(null, user);
  });
};

export { initializedPassport };
