var express = require('express');
var router = express.Router();
// var zapconfig=require('/home/ec2-user/zap_first/zapconfig');
var zapconfig=require('F:/Abk/Dev_new/node/zap_first_beta/zapconfig.js');

var User = require(zapconfig.mainUrl + '/models/usermodel');
var Job = require(zapconfig.mainUrl + '/models/jobmodel');
var passwordauth=require(__dirname + '/passwordauth')
var fs=require('fs');
// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);

router.get('/job/bystatus/:job_status', function(req, res, next) {
  //res.json({message:'get a user'});
  Job.find({job_status:req.params.job_status}, function(err, jobs) {
            var jobsize=Object.keys(jobs).length;
            if (err){
                  res.status(500).send('{error: "' + err + '"}');
              }else if(jobsize==0){
                res.status(203).send({message:"No Job Found"});
              }else if(jobs){
                  res.status(200).json(jobs);
                }
        });
});

router.get('/job/bystatusandid/:job_status/:job_id', function(req, res, next) {
  //res.json({message:'get a user'});
  Job.findOne({job_id: req.params.job_id,job_status:req.params.job_status}, function(err, job) {
        if(typeof job!=='undefined' && job!==null){
	    var jobsize=Object.keys(job).length;
            if (err){
                  res.status(500).send('{error: "' + err + '"}');
              }else if(jobsize==0){
                res.status(203).send({message:"No Job Found"});
              }else if(job){
                  res.status(200).json(job);
                }
	}else {
	res.status(203).send({message:"No Job Found"});
	}

        });
});

router.post('/user', function(req, res, next) {
var luser=req.body.email.toLowerCase();
  User.findOne({email: luser}, function(err, user) {
            if (err){
                res.status(500).send('{error: "' + err + '"}');
              }else if (user) {
                res.status(203).send({ message: 'user already exists with this email id!' });
              }else{

                var hashpassword=passwordauth.endcodepass(req.body.password);
              var user = new User();      // create a new instance of the User model
                if(luser==zapconfig.SuperUser){
                  user.role="jobadmin";
                }
                user.first_name = req.body.first_name;  // set the user name (comes from the request)
                user.last_name=req.body.last_name;
                user.phone=req.body.phone;
                user.email=luser;
                user.password=hashpassword;
                user.account_active=zapconfig.defaultaccount_active;
                user.account_balance=zapconfig.defaultaccount_balance;
                user.account_limit=zapconfig.defaultaccount_limit;

                // save the user and check for errors
                user.save(function(err) {
                    if (err){
                        res.status(500).send('{error: "' + err + '"}');
                      }else {
                    res.json({ message: 'user created!' });
                  }
                });
            }});
});

module.exports = router;
