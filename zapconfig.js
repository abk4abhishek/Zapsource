// var zapconfig={
// // AWS environment
//         jwtsecret:"JWTThisistheOnlysolutionHere",
//         mongodatabaseurl:"mongodb://ip-172-31-34-187:27017/zap_first",
//         mainUrl:__dirname,
//         defaultaccount_active:true,
//         defaultaccount_balance:99,
//         defaultaccount_limit:false,
//         SuperUser:"abk.mysoft@gmail.com"
// };
var zapconfig={
  // local environment
        jwtsecret:"JWTThisistheOnlysolutionHere",
        mongodatabaseurl:"mongodb://127.0.0.1:27017/zap_first_local",
        mainUrl:__dirname,
        defaultaccount_active:true,
        defaultaccount_balance:99,
        defaultaccount_limit:false,
        SuperUser:"abk.mysoft@gmail.com"
};

module.exports=zapconfig;
