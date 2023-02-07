const createError = require('http-errors');
const errorsResponse = require('../helpers/errorsResponse');
const User = require('../database/models/User');
const generateTokenRandom = require('../helpers/generateTokenRandom');
const generateJWT = require('../helpers/generateJWT');
const { confirmRegister, forgotPass } = require('../helpers/sendMail');


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

            const token = generateTokenRandom(); 
            user = new User(req.body);
            user.token = token;
            // console.log(user);
            
            const userStore = await user.save();

            //TODO: enviar el emal de confirmacion
            await confirmRegister({
                name: userStore.name,
                email: userStore.email,
                token: userStore.token
            })

            return res.status(201).json({
                ok: true,
                msg: 'Se ha enviado un email para completar su registro',
                data: userStore
            })
        } catch (error) {
            return errorsResponse(res, error, 'AuthC >> Register');
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
                throw createError(403,'Credenciales invalidas');
            };

            if(!user.checked){
                throw createError(403,'Tu cuenta no ha sido confirmada');
            };

            if(!await user.checkedPassword(pass)){
                throw createError(403,'Credenciales invalidas');
            }

            return res.status(201).json({
                ok: true,
                msg: 'Usuario Logeado',
                user: {
                    nombre: user.name,
                    apellido: user.lastName,
                    _id: user._id
                },
                token: generateJWT({
                    id: user._id
                })
            })
        } catch (error) {
            return errorsResponse(res, error, 'AuthC >> Login');
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

            user.checked = true;
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

            const token = generateTokenRandom();

            user.token = token;
            
            const userStore = await user.save();

            //TODO: enviar email para re establecer contraseña
            await forgotPass({
                name: user.name,
                email: user.email,
                token: user.token
            })

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
            const {token} = req.query;
             
            if (!token) throw createError(400, 'Token inexistente');

            const user = await User.findOne({
                token
            })

            if (!user) throw createError(400, 'Token invalido');

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
            const {token} = req.query;
            const {pass} = req.body;

            if (!pass) throw createError(400, 'Contraseña obligatoria');

            const user = await User.findOne({
                token
            });

            if (!user) throw createError(400, 'Token invalido');

            user.pass = pass;
            user.token = "";
            
            await user.save();

            return res.status(200).json({
                ok: true,
                msg: 'Su contraseña fue actualizado correctamente'
            });
        } catch (error) {
            return errorsResponse(res, error, 'AuthC >> ChangePass');
        }
    },
}