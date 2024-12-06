const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const swaggerDocumentLocalhost = require('./swagger-output-localhost.json');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

// Body-parser Middleware
app.use(bodyParser.json());

// Cors Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Controll-Allow-Origin', '*');
  res.setHeader(
    'Access-Controll-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader('Access-Controll-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
  next();
});
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));
app.use(cors({ origin: '*' }));

// Swagger Middleware
if (process.env.ENVIRONMENT == 'dev') {
  app.use('/api-docs', swaggerUi.serve);
  app.use('/api-docs', swaggerUi.setup(swaggerDocumentLocalhost));
} else {
  app.use('/api-docs', swaggerUi.serve);
  app.use('/api-docs', swaggerUi.setup(swaggerDocument));
}

// Authentication Middleware
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      userController.findOrCreate(profile._json);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.use('/', require('./routes'));

app.get('/', (req, res) => {
  // #swagger.ignore = true
  res.send(
    req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out'
  );
});

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false
  }),
  (req, res) => {
    // #swagger.ignore = true
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Error handling
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}/n Exception origin: ${origin}`);
});

// Connect to database and start server
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Database connected and server running on port ${PORT}`);
    });
  }
});
