const createError = require('http-errors');
const errorsResponse = require('../helpers/errorsResponse');
const User = require('../database/models/User');
const generateTokenRandom = require('../helpers/generateTokenRandom');
const generateJWT = require('../helpers/generateJWT');

module.exports = {
    register: async (req, res) => {
        try {

            const {name, lastName, email, pass} = req.body;

            if ([name, lastName, email, pass].includes("")) {
                // let error = new Error('Todos los campos son obligtorios');
                // error.status = 400;
                // throw error 
                throw createError(400,'Todos los campos son obligtorios');
            };

            let user = await User.findOne({
                email
            });

            if(user){
                throw createError(400,'el email ya se encuentra registrado');
            };

            user = new User(req.body);
            user.token = generateTokenRandom();
            // console.log(user);
            
            const userStore = await user.save();

            //TODO: enviar el emal de confirmacion

            return res.status(201).json({
                ok: true,
                msg: 'Usuario Registrado',
                data: req.body
            })
        } catch (error) {
            return errorsResponse(res, error, 'AuthC >> Register')
        }
    },
    login: async (req, res) => {
        try {
            const {email, pass} = req.body;

            if ([email, pass].includes("")) {
                throw createError(400,'Todos los campos son obligtorios');
            };

            let user = await User.findOne({
                email
            });

            if(!user){
                throw createError(403,'Credenciales invalidas | Email');
            };

            if(!user.checked){
                throw createError(403,'Tu cuenta no ha sido confirmada');
            };

            if(!await user.checkedPassword(pass)){
                throw createError(403,'Credenciales invalidas | Password');
            }

            return res.status(201).json({
                ok: true,
                msg: 'Usuario Logeado',
                user: {
                    nombre: user.name,
                    email: user.email,
                    token: generateJWT({
                        id: user._id
                    })
                }
            })
        } catch (error) {
            return errorsResponse(res, error, 'AuthC >> Login')
        }
    },
    checked: async (req, res) => {
        try {
            const {token} =  req.query;

            if(!token){
                throw createError(400,'token inexistente');
            };

            const user =  await User.findOne({
                token
            });

            if(!token){
                throw createError(400,'token invalidas');
            };

            user.checked =  true;
            user.token = '';

            await user.save();

            return res.status(200).json({
                ok: true,
                msg: 'Registro completado exitosamente'
            })
        } catch (error) {
            return errorsResponse(res, error, 'AuthC >> Checked');
        }
    },
    sendToken: async (req, res) => {
        try {
            const {email} =  req.body;

            let user = await User.findOne({
                email
            });

            if(!user) throw createError(400,'Email invalido');

            user.token = generateTokenRandom();
            
            const userStore = await user.save();

            //TODO: enviar email para re establecer contraseña

            return res.status(200).json({
                ok: true,
                msg: 'Token enviado '
            });
        } catch (error) {
            return errorsResponse(res, error, 'AuthC >> SendToken');
        }
    },
    verifyToken: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Se ha enviado el email'
            })
        } catch (error) {
            return errorsResponse(res, error, 'AuthC >> VerifyToken');
        }
    },
    changePass: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'contraseña nueva'
            })
        } catch (error) {
            return errorsResponse(res, error, 'AuthC >> ChangePass');
        }
    },
}