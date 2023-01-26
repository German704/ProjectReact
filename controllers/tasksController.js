module.exports = {
    list: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Lista de Tareas'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en Tasks >> List'
            })
        }
    },
    store: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Tareas guardadas'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en Tasks >> Store'
            })
        }
    },
    detail: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Detalle de la Tarea'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Tasks >> Detail'
            })
        }
    },
    update: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Tarea actualizado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Tasks >> Update'
            })
        }
    },
    remove: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Tarea eliminado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Tasks >> Remove'
            })
        }
    },
    changeState: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Tarea completada'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Tasks >> ChangeState'
            })
        }
    },
}