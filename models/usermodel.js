// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

// create a schema
var userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  role:{ type: String, default: 'recruiter' },
  phone: Number,
  account_active:{ type: Boolean, default: true },
  account_balance:{ type: Number, default: 99},
  account_limit:{ type: Boolean, default: false },
  customflield_01:String,
  customflield_02:String,
  customflield_03:String,
  customflield_04:String,
  customflield_05:String
},
{timestamps: true});

userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userid' ,startAt: 11});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('User', userSchema);


// make this available to our users in our Node applications
