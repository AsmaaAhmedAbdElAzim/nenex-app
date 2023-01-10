import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';


export default function UpComming() {
  const [playingNow, setplayingNow] = useState([]);
    useEffect(()=>{
      nowplaying();
      
    },[]);
  
  
  
  
    async function nowplaying(){
      let {data} = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=44ee5523e457e74020effc2bddc4592e&language=en-US&page=1')
      setplayingNow(data.results);
    }
   console.log(playingNow);
    return <>
    {playingNow.length > 0 ?<div className="container">
      
      <div className="row">
        <div className="col-md-4">
            <h2 className='h4'>Upcoming Movies</h2>
        </div>
         {playingNow.map((movie,index)=><div key={index} className="col-md-2">
    <Link to={`/itemdetalies/${movie.id}/movie`}>
    <div className="movie position-relative">
          <img src={'https://image.tmdb.org/t/p/w500'+movie.poster_path}alt="trandingMovie" className='w-100' />
          
          
          
          <h3 className='h6 my-2 text-center '>{movie.title}{movie.name}</h3>
          {movie.vote_average && <div className="vote text-center p-1 ">
             <h6>{movie.vote_average?.toFixed(1)}</h6>
          </div>}
          
      </div>
    </Link>
      
     
      
    </div>)}
      </div>
    </div>:<div className='loading'>
    <div class="spinner">
    <div class="dot1"></div>
    <div class="dot2"></div>
  </div>
      </div>}
  
   
  
    </> 
}
