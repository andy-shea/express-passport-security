import configureMiddleware from './configure/middleware';
import configurePassport from './configure/passport';
import configureExpress from './configure/express';

let ensureAuthenticated;

export function middleware() {
  if (!ensureAuthenticated) throw 'Security module not configured.  Run configure() first';
  return {ensureAuthenticated};
}

function configure(app, findUser, findUserById, userDetailsExtractor, loadInitialData = () => ({}), loginRoute = '/login', logoutRoute = '/logout') {
  ensureAuthenticated = configureMiddleware(loginRoute);
  configurePassport(findUser, findUserById);
  configureExpress(app, loginRoute, logoutRoute, userDetailsExtractor, loadInitialData);
}

export default configure;
