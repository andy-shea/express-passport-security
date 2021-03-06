import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {compare} from 'node-password-util';

function configurePassport(findUser, findUserById) {
  passport.use(new LocalStrategy((id, password, done) => {
    let authUser;
    return findUser(id).then(user => {
      if (!user) return false;
      authUser = user;
      return compare(user, password);
    }).then(isMatch => {
      if (isMatch) done(null, authUser);
      else done(null, false, {message: 'Incorrect email or password'});
      return null;
    })
    .catch(done);
  }));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    findUserById(id).then(user => {
      done(null, user);
      return null;
    }).catch(done);
  });
}

export default configurePassport;
