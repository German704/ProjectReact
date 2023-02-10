import React from 'react'
import { FormProject } from '../components/FormProject'

export const ProjectAdd = () => {
  return (
    <>
    <div className='AddForm'>
    <h1>Crear Proyecto</h1>
        <FormProject linkC={'/projects'}/>
    </div>
    </>
  )
}
