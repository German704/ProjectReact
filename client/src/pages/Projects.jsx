import React, { useEffect } from 'react'
import { ProjectPreview } from '../components/ProjectPreview'
import { UseProjects } from '../hooks/UseProjects'

export const Projects = () => {
  const {loading, alert, showAlert, projects, getProjects} = UseProjects()

  useEffect(() => {
    getProjects();
  }, []);

  
  return (
    <>
    <h1>Proyectos</h1>
    <div className='projectsContainer'>
      {
        loading ? 
        <p>cargando...</p>
        :
        projects.length ? 
        projects.map(result => <ProjectPreview key={result._id} name={result.name} client={result.client} _id={result._id}/>)
        :
        <p>no hay Proyectos</p>
      }
    </div>
    </>
  )
}
