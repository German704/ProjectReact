const Projects = require("../database/models/Projects");
const createError = require('http-errors');
const errorsResponse = require('../helpers/errorsResponse');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    list: async (req, res) => {
        try {

            const projects = await Projects.find().where('createBy').equals(req.user).select("name client");

            return res.status(200).json({
                ok: true,
                msg: 'lista de proyectos',
                projects
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

            const {name, description, client} = req.body;

            if([name, description, client].includes("") ||!name ||!description || !client){
                throw createError(400,'Todos los campos son obligatorios');
            }

            if(!req.user){
                throw createError(401,'Error de autenticacion');
            }

            const project = new Projects(req.body);
            project.createBy = req.user._id;

            // console.log(project)
            const projectStore = await project.save();

            return res.status(201).json({
                ok: true,
                msg: 'Projecto guardado con exito',
                project: projectStore
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
            const id = req.params.id;

            if(!ObjectId.isValid(id)){
                throw createError(400,'ID invalido');
            }

            const project = await Projects.findById(id).populate('tasks');

            if(!project){
                throw createError(401,'EL proyecto que esta buscando no existe');
            }
            if(req.user._id.toString() !== project.createBy.toString()){
                throw createError(401,'No estas autorizad@');
            }

            return res.status(200).json({
                ok: true,
                msg: 'detalle de projecto',
                detail_Project: project
            });
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
            const id = req.params.id;
            const {name, description, client, dateExpire} = req.body

            if(!ObjectId.isValid(id)){
                throw createError(400,'ID invalido');
            }

            const project = await Projects.findById(id);

            if(!project){
                throw createError(401,'EL proyecto que esta buscando no existe');
            }

            if(req.user._id.toString() !== project.createBy.toString()){
                throw createError(401,'No estas autorizad@');
            }
            
            if([name, description, client].includes("") ||!name ||!description || !client){
                throw createError(400,'Todos los campos son obligatorios');
            }

            project.name = name || project.name;
            project.description = description || project.description;
            project.client = client || project.client;
            project.dateExpire = dateExpire || project.dateExpire;

            const projectUpdate = await project.save();

            return res.status(201).json({
                ok: true,
                msg: 'projecto actualizado',
                project: projectUpdate
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
            const id = req.params.id;

            if(!ObjectId.isValid(id)){
                throw createError(400,'ID invalido');
            }

            const project = await Projects.findById(id);

            if(!project){
                throw createError(401,'EL proyecto que esta buscando no existe');
            }

            if(req.user._id.toString() !== project.createBy.toString()){
                throw createError(401,'No estas autorizad@');
            }

            await project.deleteOne();
            
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