var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);



module.exports = {
  endcodepass: function(password) {
    var hashpassword = bcrypt.hashSync(password, salt);
    return hashpassword;
  },

  comparepass: function(actualpassword,expectedpassword) {
  return bcrypt.compareSync(actualpassword, expectedpassword);
  }
};
