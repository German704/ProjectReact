module.exports = (res, error, methods) => {
    console.log(error);
    return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || `Upss, error en el ${methods}`
    })
}