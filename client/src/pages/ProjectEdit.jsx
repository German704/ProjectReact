import { Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FormProject } from "../components/FormProject";
import { UseProjects } from "../hooks/UseProjects";

export const ProjectEdit = () => {
    const {id} = useParams();
   
    return (
        <>
            <div className="editform">
                <div>
                <h1>Editar proyecto: Nombre</h1>
                
                </div>
            {/* </div>
            <div> */}
                <FormProject linkC={`/projects/${id}`}/>
            </div>
        </>
    );
};
