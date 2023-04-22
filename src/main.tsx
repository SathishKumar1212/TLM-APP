import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import FeatureConfig from "./Pages/Feature/FeatureRouter";


function Main() {
    const navigate = useNavigate();
    let loggedInUser!:string;       
    const handleLogout = () => {
        localStorage.setItem('auth','');
        navigate('/login')
    };
    useEffect(() => {  loggedInUser = localStorage.getItem('auth') || ''; }, []);
    return(
    <>
        {loggedInUser !== 'true'&&
         <Routes>
            <Route path='/*' element={<FeatureConfig />} />
         </Routes>
        }
        {loggedInUser==='true' &&  navigate('/login') }
    </>
    )
}

export default Main;