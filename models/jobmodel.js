// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

// create a schema
var jobSchema = new Schema({
  job_submittedby:String,
  job_paid: Boolean,
  job_status:String,
  job_title: { type: String, required: true },
  job_description: { type: String, required: true },
  job_company: String,
  job_mandatoryskills:String,
  job_preferredskills:String,
  job_url: String,
  job_salary: String,
  job_salaryoption:String,
  job_type: String,
  job_experience: String,
  job_category: String,
  job_education: String,
  job_street:String,
  job_city: String,
  job_state: String,
  job_country: { type: String, required: true },
  job_postalcode: { type: String, required: true },
  job_domain: String,
  job_otherdetails: String,
  job_notes: String,
  job_customfield_01:String,
  job_customfield_02:String,
  job_customfield_03:String,
  job_customfield_04:String,
  job_customfield_05:String
},
{timestamps: true});

jobSchema.plugin(autoIncrement.plugin, { model: 'Job', field: 'job_id' ,startAt: 1});
// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('Job', jobSchema);

// make this available to our users in our Node applications
