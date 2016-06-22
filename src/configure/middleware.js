function configureMiddleware(loginRoute) {
  return function ensureAuthenticated(req, res, next) {
    if (req.path === loginRoute || req.isAuthenticated()) next();
    else {
      req.session.returnTo = req.path;
      res.status(403).end();
      res.redirect(loginRoute);
    }
  }
}

export default configureMiddleware;
