import configureMiddleware from './configure/middleware';

export configurePassport from './configure/passport';
export configureExpress from './configure/express';

let loginRoute = '/login';
let logoutRoute = '/logout';

export function middleware() {
  return configureMiddleware(loginRoute);
}

export function configureRoutes(login, logout) {
  loginRoute = login;
  logoutRoute = logout;
}
