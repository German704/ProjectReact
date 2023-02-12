const Projects = require('../database/models/Projects');
const Tasks = require('../database/models/Tasks');
const createError = require('http-errors');
const errorsResponse = require('../helpers/errorsResponse');
const ObjectId = require('mongoose').Types.ObjectId;

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
            const id = req.params
            const {name, description, priority, project:projectId} =  req.body;

            // console.log('id PRoject ---', projectId);

            if([name, description, priority].includes("") || !name || !description || !priority){
                throw createError(400,'Todos los campos son obligatorios');
            }

            const project = await Projects.findById(projectId);
            // console.log('id PRoject ---', project);
            if(req.user._id.toString() !== project.createBy.toString()){
                throw createError(401,'No estas autorizad@');
            }

            const taskStore = await Tasks.create(req.body);

            project.tasks.push(taskStore._id);

            await project.save();

            return res.status(200).json({
                ok: true,
                msg: 'Tarea guardada',
                task: taskStore
            });
        } catch (error) {
            return errorsResponse(res, error, 'error en Tasks >> Store');
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