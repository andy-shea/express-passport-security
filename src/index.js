import configureMiddleware from './configure/middleware';
import configurePassport from './configure/passport';
import configureExpress from './configure/express';

let ensureAuthenticated;

export function middleware() {
  if (!ensureAuthenticated) throw 'Security module not configured.  Run configure() first';
  return {ensureAuthenticated};
}

function configure(app, findUser, findUserById, userDetailsExtractor, loginRoute = '/login', logoutRoute = '/logout') {
  ensureAuthenticated = configureMiddleware(loginRoute);
  configurePassport(findUser, findUserById);
  configureExpress(app, loginRoute, logoutRoute, userDetailsExtractor);
}

export default configure;
