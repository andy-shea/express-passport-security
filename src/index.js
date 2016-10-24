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

function defaultUserDetailsExtractor(user) {
  const extractedUser = {...user};
  delete extractedUser.password;
  return extractedUser;
}

function defaultLoadInitialData() {
  return Promise.resolve({});
}

export function configureApp(app, {userDetailsExtractor = defaultUserDetailsExtractor, loadInitialData = defaultLoadInitialData}) {
  configureExpress(app, loginRoute, logoutRoute, userDetailsExtractor, loadInitialData);
}
