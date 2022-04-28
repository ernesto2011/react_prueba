const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "MYsecretKEy12$$";

exports.createAccessToken = function(user){
   const payload ={
    id: user._id,
    name: user.name,
    lastename: user.lastname,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    exp: moment()
        .add(30, "minutes")
        .unix()
   };
   return jwt.encode(payload,SECRET_KEY);
};
exports.createfreshToken = function(user){
   const payload= {
       id: user._id,
       exp: moment()
            .add(3, "hours")
            .unix()
   };
   return jwt.encode(payload, SECRET_KEY);
};

exports.decodeToken = function(token){
    return jwt.decode(token, SECRET_KEY, true);
};