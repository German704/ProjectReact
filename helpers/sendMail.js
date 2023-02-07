const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
});

module.exports = {
    confirmRegister: async (data) => {
        const {name, email, token} = data;
        try {
            await transport.sendMail({
                from:'Proyect React <info@ProjectReact.com>',
                to: email,
                subject: 'Confirmá tu cuenta',
                text: 'confirme su cuenta para terminar el registro en Project React',
                html:`
                <h1>Hola ${name}</h1>
                <p>Has click en el siguiente enlace</p>
                <a href="${process.env.URL_FRONT}/confirm-account/${token}">Confirma tu cuenta</a>
                `
            })
        } catch (error) {
            console.log('error => ' + error.message);
        }
    },
    forgotPass: async (data) => {
        const {name, email, token} = data;
        try {
            await transport.sendMail({
                from:'Proyect React <info@ProjectReact.com>',
                to: email,
                subject: 'Reestablecer tu contraseña',
                text: 'confirme su nueva contraseña para reestablecer la contraseña',
                html:`
                <h1>Hola ${name}</h1>
                <p>Has click en el siguiente enlace</p>
                <a href="${process.env.URL_FRONT}/recover-Pass/${token}">Resstablecer mi contraseña</a>
                `
            })
        } catch (error) {
            console.log('error => ' + error.message);
        }
    }
}