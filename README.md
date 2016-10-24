# express-passport-security

Configures an [Express](https://github.com/expressjs/express) app for authentication
using [Passport](https://github.com/jaredhanson/passport)'s local strategy.

## Install

```
yarn add express-passport-security
```

## API

### configurePassport(findUser, findUserById)

Configures Passport with the required user retrieval functions.

- **`findUser(username)`**<br>
  returns a user from a given username for authentication

- **`findUserById(id)`**<br>
  returns a user from a given ID for session deserialisation

**Note: the user returned must have an `id` property to uniquely identify the user
and a `password` property containing a bcrypt hash of the user's password.
Use something like [node-password-util](https://github.com/andy-shea/node-password-util)
to correctly hash passwords when creating users.**

### configureApp(app, [options])

Integrates the given Express instance with Passport and adds a login and logout route handler.

- **`app`**<br>
  the Express instance

- **`options`**<br>
  optional object to allow configuration of post authentication flow. Available options are:
  - `userDetailsExtractor(user)`<br>
    an optional function which returns only the required properties from the user object.
    By default, just the password will be removed.

  - `loadInitialData(user, req)`<br>
    an optional function to return any initial data required by the app after successful authentication.
    Any implementation given must return a Promise which resolves to an object containing the initial data.

### middleware()

Express middleware to redirect unauthenticated users in secure routes to the login page.
`returnTo` is set on the session to allow redirection back to the route after login.

### configureRoutes(login, logout)

By default, login and logout routes are set to `/login` and `/logout` respectively.  Use this method to configure the routes.

**Note: this will need to be called before `configureApp` and `middleware`.**

## Example

```javascript
import express from 'express';
import body from 'body-parser';
import cookies from 'cookie-parser';
import session from 'express-session';
import {configureApp, configurePassport, middleware} from 'express-passport-security';

const app = express();
app.use(body.urlencoded({extended: true}));
app.use(cookies());
app.use(session({
  secret: 'secretsquirrel',
  saveUninitialized: true,
  resave: true
}));

// configure passport (findByEmail and findById implementations not shown)
configurePassport(findByEmail, findById);

// configure express
configureApp(app, {
  loadInitialData(user, req) {
    // return foo and bars after authentication (loadFoo and loadBars implementations not shown)
    return Promise.all([loadFoo(), loadBars()]).then(([foo, bars]) => {
      return {foo, bars};
    });
  }
});

// no authentication required so no middleware included
app.use('/', (req, res) => {
  res.send('Hello, World!');
});

// secure /foo with middleware
app.use('/foo', middleware, (req, res) => {
  res.send("I'm secure!");
});
```

## Licence

[MIT](./LICENSE)
