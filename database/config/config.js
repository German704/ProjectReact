const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.CONNECT_DB)
        const url = `${connection.host}:${connection.port}`
        console.log(`mongoDB conectado en ${url}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
    }
};

module.exports = connectDB;