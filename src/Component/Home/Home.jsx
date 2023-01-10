import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import MediaItem from '../MediaItem/MediaItem';
// import MediaItem from '../MediaItem/MediaItem';


export default function Home() {
    const [trandingMovie, setTrandingMovie] = useState([]);
    const [trandingTv, setTrandingTv] = useState([]);
    const [TrandingPeople, setTrandingPeople] = useState([]);
   // const [loading, setloading] = useState(false);
     async function getTranding(dataType,callback){
       let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${dataType}/day?api_key=44ee5523e457e74020effc2bddc4592e`)
       callback(data.results);
       // console.log(data.results);
     }
     useEffect(()=>{
       // setloading(false);
     getTranding('movie',setTrandingMovie);
     getTranding('tv',setTrandingTv);
     getTranding('person',setTrandingPeople);
     // setloading(true)
   
     },[]);
     console.log(trandingMovie);
   
     return <>
     <Helmet>
                   <meta charSet="utf-8" />
                   <title>NeNex</title>
                   <link rel="canonical" href="http://mysite.com/example" />
               </Helmet>
     {trandingMovie.length > 0 && trandingTv.length > 0 && TrandingPeople.length >0 ?<>
       <div className="row  g-3">
       <div className="col-md-4">
        <div className='d-flex align-items-center'>
          <div className="head-home ps-2 ">
         <div className="border w-50 my-3"></div>
           <h2 className='h4 fw-bold py-3'>Tranding <br/> Movies <br />To Watch Now</h2>
           <p className='text-muted'>Most Watch Movies by day </p>
           <div className="border w-100 my-3"></div>
         </div>
        </div>
        
         
       </div>
       {trandingMovie.slice(0,10).map(( item ,index)=> <MediaItem key={index} item={item}/>)}
     </div>
     <div className="row mt-5 g-3">
       <div className="col-md-4">
        <div className='d-flex align-items-center'>
          <div className="head-home ps-2 ">
         <div className="border w-50 my-3"></div>
           <h2 className='h4 fw-bold py-3'>Tranding <br/> TV Shows <br />To Watch Now</h2>
           <p className='text-muted'>Most Watch Tv Shows by day </p>
           <div className="border w-100 my-3"></div>
         </div>
        </div>
        
         
       </div>
       {trandingTv.slice(0,10).map(( item ,index)=> <MediaItem key={index} item={item}/>)}
     </div>
     <div className="row mt-5 g-3">
       <div className="col-md-4">
        <div className='d-flex align-items-center'>
          <div className="head-home ps-2 ">
         <div className="border w-50 my-3"></div>
           <h2 className='h4 fw-bold py-3'>Tranding <br/> People <br />To Watch Now</h2>
           <p className='text-muted'>Most Watch People by day </p>
           <div className="border w-100 my-3"></div>
         </div>
        </div>
        
         
       </div>
       {TrandingPeople.filter((people)=>people.profile_path !== null).slice(0,10).map(( item ,index)=> <MediaItem key={index} item={item}/>)}
     </div>
     </>:<div className='loading'>
     <div class="spinner">
     <div class="dot1"></div>
     <div class="dot2"></div>
   </div>
       </div>  }
   
     </>
}
