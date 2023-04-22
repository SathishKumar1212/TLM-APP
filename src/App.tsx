import React from 'react';
import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Login from './Pages/Auth/Login';
import Main from './main';


function App() {
  
   return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
            <Route path="/login"  element={<Login />} />
            <Route path="/*"  element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
