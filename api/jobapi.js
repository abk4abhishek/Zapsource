var express = require('express');
var router = express.Router();
// var zapconfig=require('/home/ec2-user/zap_first/zapconfig');
var zapconfig=require('F:/Abk/Dev_new/node/zap_first_beta/zapconfig.js');

var Job = require(zapconfig.mainUrl + '/models/jobmodel');
/* GET users listing. */
router.get('/jobs', function(req, res, next) {
  //res.json({message:'get all users'});
  Job.find(function(err, jobs) {
            var jobsize=Object.keys(jobs).length;
            if (err){
                  res.status(500).send('{error: "' + err + '"}');
              }else if(jobsize==0){
                  res.status(203).send({message:"No Job Found"});
              }else{
                  res.status(200).json(jobs);
                }
        });
});
router.get('/job/byid/:job_id', function(req, res, next) {
  //res.json({message:'get a user'});
  Job.findOne({job_id: req.params.job_id}, function(err, job) {
            var jobsize=Object.keys(job).length;
            if (err){
                  res.status(500).send('{error: "' + err + '"}');
              }else if(jobsize==0){
                  res.status(203).send({message:"No Job Found"});
                }else{
                    res.status(200).json(job);
                }
        });
});
router.get('/job/bysubmitted/', function(req, res, next) {
  //res.json({message:'get a user'});
  Job.find({job_submittedby: req.decoded.email}, function(err, jobs) {
              var jobsize=Object.keys(jobs).length;
            if (err){
                  res.status(500).send('{error: "' + err + '"}');
              }else if(jobsize==0){
                  res.status(203).send({message:"No Job Found"});
                }else{
                  res.status(200).json(jobs);
                }
        });
});
router.get('/job/bystatus/:job_status', function(req, res, next) {
  //res.json({message:'get a user'});
  Job.find({job_status:req.params.job_status}, function(err, jobs) {
            var jobsize=Object.keys(jobs).length;
            if (err){
                  res.status(500).send('{error: "' + err + '"}');
              }else if(jobsize==0){
                  res.status(203).send({message:"No Job Found"});
                }else{
                  res.status(200).json(jobs);
                }
        });
});

router.post('/job', function(req, res, next) {
  //res.json({message:'Add a user'});
    var job = new Job();      // create a new instance of the User model
      job.job_submittedby=req.decoded.email;
      job.job_title= req.body.job_title;
      job.job_status=req.body.job_status;
      job.job_description= req.body.job_description;
      job.job_company= req.body.job_company;
      job.job_salary= req.body.job_salary;
      job.job_salaryoption=req.body.job_salaryoption;
      job.job_type= req.body.job_type;
      job.job_mandatoryskills=req.body.job_mandatoryskills;
      job.job_preferredskills=req.body.job_preferredskills;
      job.job_experience= req.body.job_experience;
      job.job_category= req.body.job_category;
      job.job_education= req.body.job_education;
      job.job_street=req.body.job_street;
      job.job_city= req.body.job_city;
      job.job_state= req.body.job_state;
      job.job_country= req.body.job_country;
      job.job_postalcode= req.body.job_postalcode;
      job.job_domain= req.body.job_domain;
      job.job_otherdetails= req.body.job_otherdetails;

      // save the user and check for errors
      job.save(function(err) {
          if (err){
                res.status(500).send('{error: "' + err + '"}');
            }else{
          res.json({ message: 'job saved!' });
        }
      });
});
router.put('/job/status/:job_id', function(req, res, next) {
if(req.decoded.role=="jobadmin"){
  Job.findOne({job_id: req.params.job_id}, function(err, job) {
              var jobsize=Object.keys(job).length;
            if (err){
                res.status(500).send('{error: "' + err + '"}');
              }else if(jobsize==0){
                res.status(203).send({message:'Job not found'})
              }else if (job) {
                            job.job_status=req.body.job_status;
                            job.job_notes=req.body.job_notes;
                            // save the user and check for errors
                            job.save(function(err) {
                                if (err){
                                      res.status(500).send('{error: "' + err + '"}');
                                  }else{
                                res.json({ message: 'job updated!' });
                              }});
                  }

          });
        }else{
          res.status(403).send({message:"Not Authorized"});
        }
});

router.put('/job/:job_id', function(req, res, next) {
  //res.json({message:'update a job'});

  Job.findOne({job_id: req.params.job_id}, function(err, job) {
            var jobsize=Object.keys(job).length;
            if (err){
                res.status(500).send('{error: "' + err + '"}');
              }else if(jobsize==0){
                res.status(203).send({message:'Job not found'})
              }else if (job) {
                            job.job_title= req.body.job_title;
                            job.job_description= req.body.job_description;
                            job.job_company= req.body.job_company;
                            job.job_salary= req.body.job_salary;
                            job.job_mandatoryskills=req.body.job_mandatoryskills;
                            job.job_preferredskills=req.body.job_preferredskills;
                            job.job_experience= req.body.job_experience;
                            job.job_category= req.body.job_category;
                            job.job_education= req.body.job_education;
                            job.job_street=req.body.job_street;
                            job.job_city= req.body.job_city;
                            job.job_state= req.body.job_state;
                            job.job_country= req.body.job_country;
                            job.job_postalcode= req.body.job_postalcode;
                            job.job_domain= req.body.job_domain;
                            job.job_otherdetails= req.body.job_otherdetails;
                            // save the user and check for errors
                            job.save(function(err) {
                                if (err){
                                      res.status(500).send('{error: "' + err + '"}');
                                  }else{
                                res.json({ message: 'job updated!' });
                              }});
                      }
          });
});


router.delete('/job/:job_id', function(req, res, next) {

  Job.findOne({job_id: req.params.job_id}, function(err, job) {
            var jobsize=Object.keys(job).length;
            if (err){
                res.status(500).send('{error: "' + err + '"}');
              }else if(jobsize==0){
                res.status(203).send({message:'Job not found'})
              }else if (job) {
                  Job.remove({
                            job_id: req.params.job_id
                        }, function(err, job) {
                            if (err){
                                  res.status(500).send('{error: "' + err + '"}');
                              }else{
                                res.json({ message: 'Job Successfully deleted' });
                              }
                        });
                      }

            });
});

module.exports = router;
