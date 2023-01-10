import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function People() {
  const [people, setPeople] = useState([]);
  useEffect(() => {
      getPeople()
  }, [])


  async function getPeople() {
      let { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=44ee5523e457e74020effc2bddc4592e&language=en-US&page=1`);
      setPeople(data.results);
      // console.log(data.results);
  };

  async function sreachPeople(e){
     if(e.target.value){
      let {data} = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=44ee5523e457e74020effc2bddc4592e&language=en-US&query=${e.target.value}&page=1&include_adult=false`) 
      setPeople(data.results);
     }else{
      getPeople()
     }
      
  }

  return <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Popular Peaple</title>
          <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
     {people.length > 0 ?  <div className="container">
          <div className="row">
              <div className="col-md-4">
                 
                  <input type="text" placeholder='Search People..' onChange={sreachPeople} className='form-control bg-transparent my-4' />
              </div>
              {people.filter((peop)=>peop.profile_path).map((peop,index) => <div key={index} className='col-md-2'>
                  <img src={'https://image.tmdb.org/t/p/w500' + peop.profile_path} alt="trandingpeople" className='w-100' />
                  <h3 className='h6 my-2 text-center '>{peop.title}{peop.name}</h3>
              </div>)}
          </div>
      </div> :<div className='loading'>
  <div class="spinner">
  <div class="dot1"></div>
  <div class="dot2"></div>
</div>
    </div> }
    
  </>
}
