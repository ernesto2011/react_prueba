

const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "MYsecretKEy12$$";

exports.ensureAuth= (req, res, next) =>{
    if (!req.headers.authorization) {
        return res
        .status(403)
        .send({message: "la peticion no tiene cabecera de autenticación"});   
    }

    const token = req.headers.authorization.replace(/['"]+/g,"");

    try {
        var payload= jwt.decode(token, SECRET_KEY);
        if (payload.exp <= moment().unix()) {
            return res.status(404).send({message: "el token ha expirado."});

        }
    } catch (ex) {
        console.log(ex);
        return  res.status(404).send({message: "Token Inválido"});
    }
    req.user= payload;
    next();
};