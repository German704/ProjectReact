module.exports = {
    register: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Usuario Registrado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Register'
            })
        }
    },
    login: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Usuario Logeado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Login'
            })
        }
    },
    checked: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Usuario checkeado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Checked'
            })
        }
    },
    sendToken: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Token enviado '
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el SendToken'
            })
        }
    },
    verifyToken: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Token verificado '
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el VerifyToken'
            })
        }
    },
    changePass: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'contraseña nueva'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el ChangePass'
            })
        }
    },
}