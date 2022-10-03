import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const API_URL='https://mittens-buffalo.cyclic.app';
const AuthContext = createContext();

const ApiContext = (props) => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [images, setImages] = useState([]);
    

    const setToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    const authenticateUser = async () =>{
        const storeToken = localStorage.getItem('authToken');

        if(storeToken) {
            axios.get(`${API_URL}/auth/verify`, {headers: {Authorization: `Bearer ${storeToken}`}})
            .then((response) => {
                const user = response.data;
                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(user);
            })
            .catch((error) => {
                setIsLoggedIn(false);
                setIsLoading(false);
                setUser(null);
            });
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    };

    const removeToken = () => {
        localStorage.removeItem("authToken");
    };

    const logOutUser = () => {
        removeToken();
        authenticateUser();
        navigate('/');
    };
      
      useEffect(() => { 
        authenticateUser();
      },[]);


return (
    <AuthContext.Provider value={{setToken, authenticateUser, logOutUser, user, isLoading, isLoggedIn, toggle, setToggle, images, setImages}}>
        {props.children}
    </AuthContext.Provider>
    )
};

export { ApiContext, AuthContext };