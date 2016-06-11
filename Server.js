var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./REST.js");
var app  = express();
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
function REST(){
    var self = this;
    self.connectMysql();
};
passport.use(new Strategy({
    clientID: 232554233795408,
    clientSecret: "e7d4d918e43549b923fee5d8b9757ff5",
    callbackURL: 'http://localhost:3000/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
app.use(passport.initialize());
app.use(passport.session());
REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : '1234',
        database : 'limetray_assignment',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use('/frontend', express.static(__dirname + '/frontend'));
      var router = express.Router();
      app.use('/api', router);
      app.get('/login/facebook',
  passport.authenticate('facebook'));
var finsert =function(user){
  var query = "insert into user(username,pwd) values("+user.id+","+user.id+")";
  connection.query(query,function(err,rows){
            if(err) {
              console.log(err)
            } else {
              console.log(rows)

            }
        })
}
var flogin = function(user){
  console.log('flogin')
  var query = "select count(id) as ct,id from user where username='"+user.id+"'";
        console.log(query);
        var table = "[]"
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
              console.log(err)
            } else {
              if(rows[0].ct==0){
                finsert(user)

              }
              else{

              }

            }
        })
}

app.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    flogin(req.user)
    res.redirect('/frontend/#/login?userid='+req.user.id);
  });
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("All right ! I am alive at Port 3000.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new REST();
