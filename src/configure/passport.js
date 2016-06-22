import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {comparePassword} from '../utils/password';

function configurePassport(findUser, findUserById) {
  passport.use(new LocalStrategy((id, password, done) => {
    let authUser;
    return findUser(id)
        .then(user => {
          if (!user) return false;
          authUser = user;
          return comparePassword(user, password);
        })
        .then(isMatch => {
          if (isMatch) done(null, authUser);
          else done(null, false, {message: 'Incorrect email or password'});
        })
        .catch(done);
  }));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    findUserById(id).then(user => done(null, user)).catch(done);
  });
}

export default configurePassport;
