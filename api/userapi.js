var express = require('express');
var router = express.Router();
// var zapconfig=require('/home/ec2-user/zap_first/zapconfig');
var zapconfig=require('F:/Abk/Dev_new/node/zap_first_beta/zapconfig.js');

var User = require(zapconfig.mainUrl + '/models/usermodel');
var Job = require(zapconfig.mainUrl + '/models/jobmodel');
var passwordauth=require(__dirname + '/passwordauth');
var usercon=require(__dirname + '/apiuserconfig');
var fs=require('fs');
var async1 = require('async');



/* GET users listing. */
router.get('/users', function(req, res, next) {
  if(req.decoded.role=="jobadmin"){
  User.find(function(err, users) {
            var usersize=Object.keys(users).length;
            if (err){
                  res.status(500).send('{error: "' + err + '"}');
              }else if(usersize==0){
                res.status(203).send({message:"No User Found"});
              }else if(users){
                  res.status(200).json(users);
                }

        });
      }else{
        res.status(403).send({message:"Not Authorized"});
      }
});

router.get('/usercon', function(req, res, next) {
  //res.json({message:'get all users'});
                  User.findOne({email: req.decoded.email}, function(err, user) {
                            var usersize=Object.keys(user).length;
                            if (err){
                                  res.status(500).send('{error: "' + err + '"}');
                              }else if(usersize==0){
                                res.status(203).send({message:"No User Found"});
                              }else if(user){
                                  usercon.statuslist.currentUser=user;
                                  res.status(200).json(usercon.statuslist);
                                }
                        });

});
router.get('/user/:email', function(req, res, next) {

var luser=req.params.email.toLowerCase();
  User.findOne({email: luser}, function(err, user) {
            var usersize=Object.keys(user).length;
            if (err){
                  res.status(500).send('{error: "' + err + '"}');
              }else if(usersize==0){
                res.status(203).send({message:"No User Found"});
              }else if(user){
                  res.status(200).json(user);
                }
        });
});
router.post('/user', function(req, res, next) {
  if(req.decoded.role=="jobadmin"){
  var luser=req.body.email.toLowerCase();
  User.findOne({email: luser}, function(err, user) {
            if (err){
                res.status(500).send('{error: "' + err + '"}');
              }else if (user) {
                res.status(203).send({ message: 'user already exists with this email id!' });
              }else{
                var hashpassword=passwordauth.endcodepass(req.body.password);
              var user = new User();      // create a new instance of the User model
                user.first_name = req.body.first_name;  // set the user name (comes from the request)
                user.last_name=req.body.last_name;
                user.phone=req.body.phone;
                user.email=luser;
                user.password=hashpassword;
                user.role=req.body.role;
                user.account_active=true;
                user.account_balance=99;
                user.account_limit=false;
                user.save(function(err) {
                    if (err){
                        res.status(500).send('{error: "' + err + '"}');
                      }else {
                    res.json({ message: 'user created!' });
                  }
                });
            }});
          }else{
            res.status(403).send({message:"Not Authorized"});
          }


});


router.put('/user/:email', function(req, res, next) {
  if(req.decoded.role=="jobadmin"){
var luser=req.params.email.toLowerCase();
  User.findOne({email: luser}, function(err, user) {
            var usersize=Object.keys(user).length;
            if (err){
                res.status(500).send('{error: "' + err + '"}');
              }else if(usersize==0){
                res.status(203).send({message:'User not found'})
              }else if (user) {

                        user.first_name = req.body.first_name;  // set the user name (comes from the request)
                        user.last_name=req.body.last_name;
                        user.phone=req.body.phone;
                        user.email=luser;
                        if(req.body.updatepassword=="true"){
                          user.password=passwordauth.endcodepass(req.body.password);
                        }
                        user.role=req.body.role;
                        user.account_active=req.body.account_active;
                        user.account_balance=req.body.account_balance;
                        user.account_limit=req.body.account_limit;
                            // save the user and check for errors
                            user.save(function(err) {
                                if (err){
                                      res.status(500).send('{error: "' + err + '"}');
                                  }else{
                                res.json({ message: 'User updated!' });
                              }});
                      };
          });
        }else{
          res.status(403).send({message:"Not Authorized"});
        }
});

router.delete('/user/:email', function(req, res, next) {
  if(req.decoded.role=="jobadmin"){
var luser=req.params.email.toLowerCase();
  User.findOne({email: luser}, function(err, user) {
            if (err){
                res.status(500).send('{error: "' + err + '"}');
              }else if (user) {
                User.remove({
                          email: req.params.email
                      }, function(err, user) {
                          if (err){
                              res.status(500).send('{error: "' + err + '"}');
                            }else{
                          res.json({ message: 'Successfully deleted' });
                            }
                      });
              }else{
                res.status(203).send({ message: 'user does not exist with this email id!' });
              }
      });
    }else{
      res.status(403).send({message:"Not Authorized"});
    }

});



module.exports = router;
