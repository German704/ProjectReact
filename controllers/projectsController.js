module.exports = {
    list: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'lista de proyectos'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Projects >> List'
            })
        }
    },
    store: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'projecto guardado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Projects >> STORE'
            })
        }
    },
    detail: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'detalle de projecto'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Projects >> Detail'
            })
        }
    },
    update: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'projecto actualizado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Projects >> Update'
            })
        }
    },
    remove: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'projecto removido'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Projects >> Remove'
            })
        }
    },
    addCollaborator: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'colaborador añadido'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Projects >> AddCollaborator'
            })
        }
    },
    removeCollaborator: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'colaborador eliminado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'error en el Projects >> RemoveCollaborator'
            })
        }
    },
}