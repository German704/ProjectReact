import React, {useState, useEffect, createContext} from 'react';
import {useNavigate} from 'react-router-dom'
import { clientAxios } from '../config/clientAxios';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer),
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

const ProjectsContext = createContext();

const ProjectsProvider = ({children}) => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [oneProject, setOneProject] = useState({});

    const showAlert = (msg, time = true) => {
        setAlert({
         msg
        });
    
        if(time){
          setTimeout(() => {
            setAlert({});
          }, 5000);
        }
    }

    const getProjects = async () => {
        setLoading(true);

        try {
            const token = sessionStorage.getItem('token');
            // console.log(token)

            if(!token){
                return null;
            }

            const {data} = await clientAxios.get('/projects', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            });
            // console.log(data)
            setProjects(data.projects);
            
        } catch (error) {
            console.error(error);
            showAlert(error.response? error.response.data.msg : 'Ups, hubo un error', false);
        } finally {
            setLoading(false);
        }
    }

    const getOneProject = async (id) => {
        setLoading(true);

        try {
            const token = sessionStorage.getItem('token');

            if(!token){
                return null;
            }
            const {data} = await clientAxios.get(`/projects/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            });
            // console.log(data)
            setOneProject(data.detail_Project);

        } catch (error) {
            console.error(error);
            showAlert(error.response? error.response.data.msg : 'Ups, hubo un error', false);
        } finally {
            setLoading(false);
        }
    }

    const storeProject = async (project) => {

        try {
            const token = sessionStorage.getItem('token');

            if(!token){
                return null;
            }

            if(project.id){
                const {data} = await clientAxios.put(`/projects/${project.id}`, project, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    }
                });

                const projectUpdate = projects.map(projectState => {
                    if(projectState._id === data.project._id){
                        return data.project;
                    }
                    return projectState;
                })

                setProjects(projectUpdate);

                Toast.fire({
                    icon: 'success',
                    title: data.msg,
                });
                
                navigate(`/projects/${project.id}`);

            } else {
                const {data} = await clientAxios.post(`/projects/`, project, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    }
                });
                // console.log(data);
                setProjects([...projects, data.project]);
    
                Toast.fire({
                    icon: 'success',
                    title: data.msg,
                });
    
                navigate('/projects');
            }
            

        } catch (error) {
            console.error(error);
            showAlert(error.response? error.response.data.msg : 'Ups, hubo un error', false);
        }
    }

    const deleteProject = async (id) => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');

            if(!token){
                return null;
            }

            if(id) {
                const {data} = await clientAxios.delete(`/projects/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    }
                });

                const removeProject = projects.filter(result => result._id !== id);

                setProjects(removeProject);

                Toast.fire({
                    icon: 'success',
                    title: data.msg,
                });

                navigate('/projects');
            }

        } catch (error) {
            console.error(error);
            showAlert(error.response? error.response.data.msg : 'Ups, hubo un error', false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ProjectsContext.Provider
          value={
            {
                loading,
                getProjects,
                projects,
                getOneProject,
                oneProject,
                storeProject,
                deleteProject,
                showAlert,
                alert
            }
          }
        >
            {children}
        </ProjectsContext.Provider>
    );
}

export {
    ProjectsProvider,
    ProjectsContext
}