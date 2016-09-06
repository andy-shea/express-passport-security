import configureMiddleware from './configure/middleware';
import configurePassport from './configure/passport';
import configureExpress from './configure/express';

let ensureAuthenticated;
let loginRoute = '/login';
let logoutRoute = '/logout';

export function middleware() {
  return configureMiddleware(loginRoute);
}

export function configureRoutes(login, logout) {
  loginRoute = login;
  logoutRoute = logout;
}

function configure(app, findUser, findUserById, userDetailsExtractor, loadInitialData = () => ({})) {
  configurePassport(findUser, findUserById);
  configureExpress(app, loginRoute, logoutRoute, userDetailsExtractor, loadInitialData);
}

export default configure;
