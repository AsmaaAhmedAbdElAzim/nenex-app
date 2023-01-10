import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Popular() {
  const [playingNow, setplayingNow] = useState([]);
  useEffect(()=>{
    nowplaying();
    
  },[]);

  async function searchMovie(e){
    if(e.target.value){
      let {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=44ee5523e457e74020effc2bddc4592e&language=en-US&query=${e.target.value}&page=1&include_adult=false`)
  setplayingNow(data.results);
    }else{
      nowplaying()
    }
    
  }
  


  async function nowplaying(){
    let {data} = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=44ee5523e457e74020effc2bddc4592e&language=en-US&page=1')
    setplayingNow(data.results);
  }
 console.log(playingNow);
  return <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Popular Movies</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  {playingNow.length > 0 ?<div className="container">
    
    <div className="row">
      <div className="col-md-4">
        <h2 className='h4'>Popular Movies</h2>
      <input type='text' className='form-control bg-transparent text-white my-5 w-75' placeholder='Search .....' onChange={searchMovie}/>
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
