import React from 'react';
import { Link, NavLink } from 'react-router-dom';


export default function Navbar({userData,logOut}) {
    return <>
 
    <nav className="navbar navbar-expand-lg navbar-dark ">
    <div className="container-fluid">
      <Link className="navbar-brand" to='home'>NENEX</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {userData?<ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
          <li className="nav-item">
            <NavLink className="nav-link active " to="home">Home</NavLink>
          </li>
         
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/movie" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Movie
            </Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/movie/popular">Popular Movie</Link></li>
              <li><Link className="dropdown-item" to="/movie/playing">Now playing</Link></li>
              <li><Link className="dropdown-item" to="/movie/coming">Up Coming</Link></li>
              
              <li><Link className="dropdown-item" to="/movie/rate">Top Rated</Link></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/tv" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              TV Show
            </Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/tv/ontv">On Tv</Link></li>
              <li><Link className="dropdown-item" to="/tv/popular">Popular</Link></li>
            
              <li><Link className="dropdown-item" to="/tv/rate">Top Rate</Link></li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="pepole">People</Link>
          </li>
         
      
        </ul>:''}
        
        
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> 
        {userData? <li className="nav-item">
            <span className="nav-link logout" onClick={logOut}>Logout</span>
          </li>:<>
          <li className="nav-item">
            <Link className="nav-link " to="register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="login">Login</Link>
          </li>
          </>}
          
         
      
        </ul>
      
      </div>
    </div>
  </nav>
    </>
}
