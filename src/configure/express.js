import passport from 'passport';

function configureApp(app, loginRoute, logoutRoute, userDetailsExtractor) {
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.post(loginRoute, (req, res, next) => {
    passport.authenticate('local', (err, user, params) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({error: params ? params.message : 'Invalid login'});
        req.login(user, {}, error => {
        if (error) return res.status(500).json({error});
        return res.json({
          user: userDetailsExtractor(user),
          returnTo: (req.session && req.session.returnTo) ? req.session.returnTo : '/'
        });
      });
    })(req, res, next);
  });

  app.get(logoutRoute, (req, res) => {
    req.logout();
    res.end();
  })
}

export default configureApp;
