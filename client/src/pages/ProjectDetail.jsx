import { Divider, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Alerts } from "../components/Alerts";
import Swal from "sweetalert2";
import { Collaborator } from '../components/Collaborator';
import { Task } from '../components/Task';
import { UseProjects } from "../hooks/UseProjects";
import { ModalFormTask } from "../components/ModalFormTask";


export const ProjectDetail = () => {
    const {id} = useParams()
    const {oneProject, getOneProject, alert, loading, deleteProject, handleShowModal} = UseProjects();
    const {name, description, dateExpire, client, _id, tasks} = oneProject;

    useEffect(() => {
        getOneProject(id);
    }, [id]);


    if(alert.msg) return <Alerts {...alert}/>;

    const handleDelete = () => {
        Swal.fire({
            icon: 'info',
            title: 'Estas seguro de eliminar el projecto?',
            showCancelButton: true,
            confirmButtonColor: 'orange',
            confirmButtonText: 'Confirm',
            denyButtonText: `Cancel`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteProject(id)
              Swal.fire('Eliminado!', '', 'success')
            }
          })
    }

    return (
        <>
        {
            loading ? 
            <p>cargando...</p>
            :
            (
            <div>
            <div className="title">
                <h1>{name}</h1>
                <div>
                <Button variant="outlined" onClick={handleDelete} className="BtnNewTask" sx={{
                    ":hover": {
                        backgroundColor: "deepskyblue",
                        color: 'darkBlue'
                    },
                    marginRight: '5px'
                }}>Eliminar</Button>
                
               <Link
                    to={`/projects/edit-project/${_id}`}
                    className="EditBTN"
                >
                <Button variant='outlined' sx={{
                    ":hover": {
                        backgroundColor: "deepskyblue",
                        color: 'darkBlue'
                    }
                }}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832
19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863
4.487zm0 0L19.5 7.125"
                        />
                    </svg>
                    Editar
                </Button>
                </Link>
                </div>
            </div>

            <h2>Cliente: {client}</h2>
            <Divider sx={{borderColor: 'rgb(0 5 227)',}}/>

            <p><strong>Fecha de entrega:</strong> {dateExpire && dateExpire.substring(0,10)}</p>
            <Divider sx={{borderColor: 'rgb(0 5 227)',}}/>

            <p><strong>Descripcion:</strong> {description}</p>
            <Divider sx={{borderColor: 'rgb(0 5 227)',}}/>

            <div className="divTaskCollab">
                <h2>Tareas del proyecto</h2>
                <Button variant="outlined" onClick={handleShowModal} className="BtnNewTask" sx={{
                    ":hover": {
                        backgroundColor: "deepskyblue",
                        color: 'darkBlue'
                    }
                }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg> 
                    Nueva Tarea
                </Button>
            </div>
            {
                tasks && tasks.length ?
                tasks.map(tareas => (<Task {...tasks} 
                    key={tareas._id} 
                    name={tareas.name}
                    dateExpire={tareas.dateExpire.substring(0, 10)}
                    priority={tareas.priority}
                    description={tareas.description}
                />))
                :
                <p>No hay tareas</p>
            }
            <Divider sx={{borderColor: 'rgb(0 5 227)',}}/>
            <div className="divTaskCollab">
                <h2>Colaboradores</h2>
                <Button /* onClick={} */ className="BtnCollab" variant="outlined" sx={{
                    ":hover": {
                        backgroundColor: "deepskyblue",
                        color: 'darkBlue'
                    }
                }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75
0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318
0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                        />
                    </svg>
                    Agregar
                </Button>
            </div>
            {
                [1,2].map(collabs => (<Collaborator key={collabs}/>))
            }
            </div>
            )
        }
        
        <ModalFormTask/>
        </>
    );
};