import logo from './logo.svg';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Offline } from 'react-detect-offline';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Component/Home/Home';

import ItemDetail from './Component/ItemDetail/ItemDetail';
import ItemDetailes from './Component/ItemDetailes/ItemDetailes';
import Layout from './Component/Layout/Layout';

import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Movie from './Component/Movie/Movie';
import OnTv from './Component/OnTv/OnTv';
import NowPlaying from './Component/NowPlaying/NowPlaying';
import Popular from './Component/Popular/Popular'
import People from './Component/People/People';
import ProtectRout from './Component/ProtectRout/ProtectRout';
import TopRate from './Component/TopRate/TopRate';
import Tv from './Component/Tv/Tv';
import TvPopular from './Component/TvPopular/TvPopular';

import UpComming from './Component/UpComming/UpComming';
import TvTopRate from './Component/TVTopRate/TvTopRate'


function App() {
    useEffect(()=>{
        if(localStorage.getItem('userToken') !== null){
          saveUserData()
        }
      },[])
      
      const [userData, setuserData] = useState(null)
      function saveUserData(){
        let encoudToken=localStorage.getItem('userToken');
        let decodedToken = jwtDecode(encoudToken);
        console.log(decodedToken);
        setuserData(decodedToken);
       
      }

      let x = createBrowserRouter([
        {path:'/',element:<Layout setuserData={setuserData} userData={userData}/>,children:[
          {path:'movie' , element:<ProtectRout><Movie/></ProtectRout>,children:[
            {path:'popular', element: <Popular/>},
            {path:'rate', element: <TopRate/>},
            {path:'coming', element:<UpComming/>},
            {path:'playing', element:<NowPlaying/>},
          ]},
          {path:'tv',element:<ProtectRout ><Tv/></ProtectRout> ,children:[
            {path:'popular',element:<TvPopular/>},
            {path:'rate',element:<TvTopRate/>},
            {path:'ontv',element:<OnTv/>},
          ]},
          {path:'home',element:<ProtectRout><Home/></ProtectRout>},
          {path:'pepole',element:<ProtectRout><People/></ProtectRout>},
          {path:'itemdetailes/:id/:mediatype',element:<ProtectRout><ItemDetailes/></ProtectRout>},
          {path:'itemdetail/:id/:mediatype',element:<ProtectRout><ItemDetail/></ProtectRout>},
         
          {index:true,element:<Register/>},
          {path:'login',element:<Login saveUserData={saveUserData}/>},
          {path:'*', element:<Register/>},
        
        ]}
      ]);
      return <>
      <Offline><div className='offline'>
        you Are Offline 
      </div>
    
      </Offline>
        <RouterProvider router={x}/>
     
      
      
      </>
}

export default App;
