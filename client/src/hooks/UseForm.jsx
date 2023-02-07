import React, { useState } from 'react'

export const UseForm = (initialState = {}) => {
  
    const [formValues, setFormValues] = useState(initialState);
    const regExLetter = /^[A-Z]+$/i;


    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
        if(target.type === 'text' ){
          console.log('nopeeeee')
        }
    };

    const reset = () => {
        setFormValues(initialState);
    };

  return {
    formValues,
    setFormValues,
    handleInputChange,
    reset,
  }
}
