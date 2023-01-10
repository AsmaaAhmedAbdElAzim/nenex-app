import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';

export default function ItemDetailes() {
    let {mediatype,id} = useParams();
    
    const [itemDetalis, setitemDetalis] = useState({});
    const [similar, setSimilar] = useState({});
    
    // const [isLoading, setIsLoading] = useState(false)
   


    async function getTrandingItem(mediatype,id){
        // setIsLoading(true);
        let {data}= await axios.get(`https://api.themoviedb.org/3/${mediatype}/${id}?api_key=44ee5523e457e74020effc2bddc4592e&language=en-US`);
        setitemDetalis(data)
        // setIsLoading(false);
    }
    async function getSimilerItem(mediatype,id){
         let {data} = await axios.get(`https://api.themoviedb.org/3/${mediatype}/${id}/similar?api_key=44ee5523e457e74020effc2bddc4592e&language=en-US&page=1`)
        setSimilar(data);
     }

    useEffect(()=>{
        
        getTrandingItem(mediatype,id);
        getSimilerItem(mediatype,id)
       
    },[])
   
console.log(similar);
    
  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>
                {itemDetalis.title ? itemDetalis.title : itemDetalis.name}
                 
                </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  {Object.keys(itemDetalis).length > 0 ?<>
    <div className="row mb-5">
    <div className="col-md-4">
        <div className="img-item">
        {itemDetalis.poster_path?<img src={'https://image.tmdb.org/t/p/w500'+itemDetalis.poster_path}alt="trandingMovie" className='w-100' />:<img src={'https://image.tmdb.org/t/p/w500'+itemDetalis.profile_path}alt="tranding" className='w-100' />}
        </div>
    </div>
    <div className="col-md-8 captionDetails ">
        <h2 className='fw-bolder mb-5'>{itemDetalis.title}{itemDetalis.name}</h2>
        <h6 className='text-muted'>{itemDetalis.tagline}</h6>

        <div className="d-flex">
            {itemDetalis.genres?.map((gen , index)=> { return <div key={index}>
           <span className='gen' >{gen.name}</span> 
        </div>})}
        </div>
      
       {itemDetalis.vote?<h5 className='mt-5  '><span className='h5 px-2'>Vote :</span>{itemDetalis.vote_average?.toFixed(1)}</h5>:''} 
        {itemDetalis.vote_count?<h5 className=' py-2 '><span className='h5 px-2'>Vote Count :</span>{itemDetalis.vote_count}</h5>:''}
        {itemDetalis.popularity?<h5 className=' py-2 '><span className='h5 px-2'>popularity :</span>{itemDetalis.popularity}</h5>:''}
        {itemDetalis.number_of_episodes?<h5 className=' py-2 '><span className='h5 px-2'>Number Of Episodes :</span>{itemDetalis.number_of_episodes}</h5>:''}
        {itemDetalis.number_of_seasons?<h5 className=' py-2 '><span className='h5 px-2'>Number Of Seasons :</span>{itemDetalis.number_of_seasons}</h5>:''}
        {itemDetalis.birthday?<h5 className=' py-2 '><span className='h5 px-2'>Birthday :</span>{itemDetalis.birthday}</h5>:''}
        {itemDetalis.place_of_birth?<h5 className=' py-2 '><span className='h5 px-2'>place Of Birth :</span>{itemDetalis.place_of_birth}</h5>:''}
        {itemDetalis.known_for_department?<h5 className=' py-2 '><span className='h5 px-2'>Known For Department :</span>{itemDetalis.known_for_department}</h5>:''}
        
        
        <p className='text-muted'>{itemDetalis.overview}</p>
        <p className='text-muted'>{itemDetalis.biography}</p>
        <div className='whached my-5'>
            <button > <a href={itemDetalis.homepage}> Visit Now </a></button>
        </div>
    </div>
  </div>


  <div className="simlar mt-5">
    <div className="row g-4">
        
        {similar.results?.map((sim , index)=><div key={index} className="col-md-2">
        <Link to={`/itemdetail/${sim.id}/${mediatype}`}>
         {sim.poster_path?<img src={'https://image.tmdb.org/t/p/w500'+sim.poster_path}alt="trandingMovie" className='w-100' />:<img src={'https://image.tmdb.org/t/p/w500'+sim.profile_path}alt="tranding" className='w-100' />}
        <h6 className='fw-bolder my-2 text-center '>{sim.title}{sim.name}</h6>
        </Link>
        </div>)
        
        }
      
    </div>
  </div>
  </>:<div className='loading'>
  <div class="spinner">
  <div class="dot1"></div>
  <div class="dot2"></div>
</div>
    </div> }
 
 
  </>
}
