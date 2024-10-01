const express = require('express');

const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session')
const app = express();
const GitHubStategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(bodyParser.json())
.use(session({
  secret: "secret",
  resave: false,
  saveUnititialized: true
}))
.use(passport.initialize())
.use(passport.session())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  next();
})
.use(cors({methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
.use(cors({origin: '*'}))
.use('/', require('./routes'));


passport.use(new GitHubStategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken,refreshToken,profile,done){
  return done(null,profile);
}))

passport.serializeUser((user, done) => {
  done(null,user);
})
passport.deserializeUser((user,done) => {
  done(null,user);
})

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin ${origin}`);
});

app.get('/', (req,res) => {
  console.log("req.session.user == undefined: " + (req.session.user == undefined));
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session:false
}),
(req,res) => {
  req.session.user = req.user;
  res.redirect('/')
})


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and nodeRunning on port ${port}`);
    });
  }
});
