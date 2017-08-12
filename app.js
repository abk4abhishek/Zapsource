// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   Module require  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var compression = require('compression');
var path = require('path');
var autoIncrement = require('mongoose-auto-increment');
var jwt = require('jsonwebtoken');
var zapconfig=require('./zapconfig.js');

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   App use and configuration  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
var app = express();
app.use('/api', function(req, res, next) {
  // check header or url parameters or post parameters for token
var token = req.headers['authorization'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, zapconfig.jwtsecret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        //console.log(req.decoded.role);
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});
app.use(compression()); //use compression
app.use(express.static(__dirname + '/public'));       // Exposing public directory
app.use(bodyParser.urlencoded({ extended: false }));   // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                            // parse application/json
app.set('port', process.env.PORT || 3000);

// set a cookie
// app.use(function (req, res, next) {
//   // check if client sent cookie
//   //var cookie = req.cookies.cookieName;
//   if (req.cookies['cookieName'] === undefined)
//   {
//     // no: set a new cookie
//     var randomNumber='abkabk';
//     res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
//     console.log('cookie created successfully');
//   }
//   else
//   {
//     // yes, cookie was already present
//     console.log('cookie exists', req.cookies['cookieName']);
//   }
//   next(); // <-- important!
// });



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    set up view engine  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

var handlebars = require('express3-handlebars').create({ defaultLayout:'main',helpers: {section: function(name, options){if(!this._sections) this._sections = {};
this._sections[name] = options.fn(this);
return null;
}
}});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@         DB Connection and Modal creation            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
var connection=mongoose.connect(zapconfig.mongodatabaseurl);
mongoose.connection.on('error',function(err){
  console.log('Mongoose connection error: ' + err);
});  //On error with DB connection
process.on('SIGINT', function(){
  mongoose.connection.close(function () {
  console.log('Mongoose disconnected through app termination');
  process.exit(0);
  });
});  // On stoping App
autoIncrement.initialize(connection);
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@











// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    Route Code  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

var routes            =   require('./routes/index');
var userapi           =   require('./api/userapi');
var tempuserapi       =   require('./api/tempuserapi');
var jobapi           =   require('./api/jobapi');

var passwordauth=require('./api/passwordauth')
var User = require('./models/usermodel');
// app.use('/',          angroute);
// app.use('/users',     users   );
// app.use('/api/user/', userapi );
// app.use('/ser/', routes );
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, '/public', 'anghome.html'));
// });

app.use('/opi/', tempuserapi);

app.use('/api/user/', userapi );
app.use('/api/job/', jobapi );
app.post('/authenticate', function(req, res,next) {
  var luser=req.body.email.toLowerCase();
  User.findOne({email: luser}, function(err, user) {
            if (err){
              res.status(500).send('{error: "' + err + '"}');
            }else if (!user) {
                  res.status(203).send({ success: false, message: 'Authentication failed. User not found.' });
            }else if (user) {
                  // check if password matches
                  if (passwordauth.comparepass(req.body.password, user.password) && user.account_active==true ) {
                    var profile = {
                      first_name: user.first_name,
                      last_name: user.last_name,
                      email: user.email,
                      role:user.role
                    };
                    var token = jwt.sign(profile, zapconfig.jwtsecret,{expiresIn:45000} );//{ expiresInMinutes: 60*5 }
                    res.json({ success: true, message: 'Authentication passed. Valid user.',token:token,first_name:profile.first_name,last_name:profile.last_name,email:profile.email,role:profile.role});
                  } else {
                    res.status(203).send({ success: false, message: 'Authentication failed. Wrong password or account is inactive'});
                  }
          }});


});





app.use('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'anghome.html'));
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    app listining Code  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

 app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
