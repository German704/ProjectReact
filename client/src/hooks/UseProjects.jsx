import React, { useContext } from 'react'
import { ProjectsContext } from '../context/ProjectsProvider'

export const UseProjects = () => {
  return (
    useContext(ProjectsContext)
  )
}
