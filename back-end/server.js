const express=require('express')
const bodyParser = require('body-parser') 
const router = require('./routes')
const app = express()  
const port=8080
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
require('./config/passport')(passport);

const cors=require('cors')

app.use(cors())

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(bodyParser.json())

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.listen(port, () => {    //Turn on server
  console.log('Serverul ruleaza pe portul: ' + port)
})

app.use('/',router)
