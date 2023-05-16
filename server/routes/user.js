// server/routes/user.js
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Use passport to authenticate with Google
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Check if user exists in db
      User.findOne({ where: { googleId: profile.id } }).then((user) => {
        if (user) {
          done(null, user);
        } else {
          User.create({
            username: profile.displayName,
            googleId: profile.id,
          }).then((newUser) => done(null, newUser));
        }
      });
    }
  )
);

// Login route
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// Callback route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET);
    res.redirect("/home?token=" + token);
  }
);
