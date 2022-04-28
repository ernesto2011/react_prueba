const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name:String,
    address:String,
    rfc:{
        type:String,
        unique: true
    },
    email: String,
    telefono:String,
    contacto: String,
});

module.exports = mongoose.model("Client", UserSchema);