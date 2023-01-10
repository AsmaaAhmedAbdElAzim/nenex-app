import React from 'react'

import Navbar from '../Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout({userData , setuserData}) {
    let Navigat = useNavigate();
    function logOut(){
      localStorage.removeItem('userToken');
      setuserData(null);
      Navigat('/login');
  
    }
    return <>
    <Navbar logOut={logOut} userData={userData}/>
  <div className="container py-5">
    <Outlet></Outlet>
  </div>
    
  
    
    </>
}
