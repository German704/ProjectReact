const jwt = require('jsonwebtoken');

module.exports = (payload) => jwt.sign(payload, process.env.SECRETO_MAGICO, {
    expiresIn: '1h'
});