const errorsResponse = require("../helpers/errorsResponse");
const {verify} = require('jsonwebtoken');
const createHttpError = require("http-errors");
const User = require("../database/models/User");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // console.log('token ----> ', token);
        if(!token){
            throw createHttpError(401, "Se requiere un token");
        }

        const decoded = verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
        
        req.user = await User.findById(decoded.id).select("name lastName email");
        
        next()

    } catch (error) {
        return errorsResponse(res, error, 'CheckToken');
    }
}