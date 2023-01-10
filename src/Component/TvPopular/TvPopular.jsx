import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function TvPopular() {
  const [tvData, setTvData] = useState([]);
  useEffect(() => {
    nowplaying();

  }, []);

  async function searchTv(e) {
    if (e.target.value) {
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=44ee5523e457e74020effc2bddc4592e&language=en-US&page=1&query=${e.target.value}&include_adult=false`)
      setTvData(data.results);
    } else {
      nowplaying()
    }

  }



  async function nowplaying() {
    let { data } = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=44ee5523e457e74020effc2bddc4592e&language=en-US&page=1')
    setTvData(data.results);
  }

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Popular Tv Shows</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>

    {tvData.length > 0 ?<div className="container">
      <div className="row gy-4">
        <div className="col-md-4">
          <h3>Peopular Tv Showes</h3>
          <input type="text" placeholder='Search ...' onChange={searchTv} className='form-control bg-transparent ' />
        </div>
         {tvData.filter((tv)=>tv.poster_path).map((tv,index)=> <div key={index} className='col-md-2'>
          <Link to={`/itemdetalies/${tv.id}/tv`} >
         <img src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt='popularTv' className='w-100'/>
         <h3 className='h6 my-2 text-center '>{tv.name}</h3>
         </Link>
         </div>)}
      </div>
    </div>:<div className='loading'>
    <div class="spinner">
    <div class="dot1"></div>
    <div class="dot2"></div>
  </div>
      </div> }
    
   





  </>
}
