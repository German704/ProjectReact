import React from 'react';
import Axios from 'axios';

export const clientAxios = Axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACKENT}`
})
