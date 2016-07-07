import configureMiddleware from './configure/middleware';
import configurePassport from './configure/passport';
import configureExpress from './configure/express';

let ensureAuthenticated;

export function middleware() {
  if (!ensureAuthenticated) throw 'Security module not configured.  Run configure() first';
  return {ensureAuthenticated};
}

export * from './utils/password';

function configure(app, findUser, findUserById, loginRoute = '/login', logoutRoute = '/logout') {
  ensureAuthenticated = configureMiddleware(loginRoute);
  configurePassport(findUser, findUserById);
  configureExpress(app, loginRoute, logoutRoute);
}

export default configure;
