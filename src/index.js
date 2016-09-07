import configureMiddleware from './configure/middleware';
import configureExpress from './configure/express';

export configurePassport from './configure/passport';

let loginRoute = '/login';
let logoutRoute = '/logout';

export function middleware() {
  return configureMiddleware(loginRoute);
}

export function configureRoutes(login, logout) {
  loginRoute = login;
  logoutRoute = logout;
}

export function configureApp(app, userDetailsExtractor, loadInitialData = () => Promise.resolve({})) {
  configureExpress(app, loginRoute, logoutRoute, userDetailsExtractor, loadInitialData);
}
