import React, { createContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { clientAxios } from '../config/clientAxios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();
   

    useEffect(() => {

        const authUser = async () => {
            const token = sessionStorage.getItem('token');
            // console.log(token)
    
            if(!token){
                return null;
            }
    
            // const config = {
            //     Headers: {
            //         "Content-Type": "application/json",
            //         Authorization: Bearer 
            //     }
            // }
    
            try {
                const {data} = await clientAxios.get("/users/profile", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    }
                });
                // console.log(data);
                setAuth(data.user);
                // navigate('/projects');
                
            } catch (error) {
                console.error(error);
                sessionStorage.removeItem('token');
                setAuth({});
            } finally {
                setLoading(false); 
            }
        }
    
        authUser();
    }, [])
    
  return (
    <AuthContext.Provider
      value={
        {
            auth,
            setAuth,
            loading
        }
      }
    >
        {children}
    </AuthContext.Provider>
  )
}

export {
    AuthProvider
};

export default AuthContext;