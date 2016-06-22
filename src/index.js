import configureMiddleware from './configure/middleware';
import configurePassport from './configure/passport';
import configureExpress from './configure/express';

export const middleware = {};

export * from './utils/password';

function configure(app, findUser, findUserById, loginRoute = '/login', logoutRoute = '/logout') {
  middleware.ensureAuthenticated = configureMiddleware(loginRoute);
  configurePassport(findUser, findUserById);
  configureExpress(app, loginRoute, logoutRoute);
}

export default configure;
