import React from 'react'
import { Link } from 'react-router-dom'

export default function MediaItem({item}) {
     
    return<>
    <div className="col-md-2">
    <Link to={`/itemdetailes/${item.id}/${item.media_type}`}>
    <div className="movie position-relative">
          {item.poster_path?<img src={'https://image.tmdb.org/t/p/w500'+item.poster_path}alt="trandingMovie" className='w-100' />:<img src={'https://image.tmdb.org/t/p/w500'+item.profile_path}alt="trandingMovie" className='w-100' />}
          
          
          
          <h3 className='h6 my-2 text-center '>{item.title}{item.name}</h3>
          {item.vote_average && <div className="vote text-center p-1 ">
             <h6>{item.vote_average?.toFixed(1)}</h6>
          </div>}
          
      </div>
    </Link>
      
     
      
    </div>
    </> 
}
