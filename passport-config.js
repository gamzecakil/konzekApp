const LocalStrategy = require("passport-local").Strategy;

function initialize(passport, getUserByEmail, getUserById) {
   
  const authenticateUser = (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      console.log(user);
      console.log(email);
      return done(null, false, {
        message: "Giriş Başarısız.Email yanlış girildi.",
      });
    }
    if (password === user.password) {
      return done(null, user);
    } else {
      return done(null, false, {
        message: "Giriş Başarısız.Şifre Yanlış girildi.",
      });
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;