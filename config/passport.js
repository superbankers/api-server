const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

passport.use(User.createStrategy())
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    sessions: true
}, async (req, email, password, done) => {
    console.log(email)
    const user = await User.findOne({email: email});
    if(!user) {
        return done(null, false, {'message': 'User Not found'})
		}
		// Match password
		bcrypt.compare(password, user.password, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				return done(null, user);
			} else {
				return done(null, false, { message: 'Incorrect Password' });
			}
		});
    done(null, user);
}));