import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Login({saveUserData}) {
    let navigat = useNavigate();
    const [errorList, setErrorList] = useState([])
    const [isLooding, setIsLooding] = useState(false);
      const [erro, setErro] = useState('');
      const [user, setUser] = useState({
          
          email:'',
          password:'',
      });
  
      function getUserData(e){
          let myUser ={...user};
          myUser[e.target.name]= e.target.value;
          setUser(myUser);
          console.log(myUser);
  
      };
  
      async function sendDataToApi(){
          let {data} = await axios.post(`https://sticky-note-fe.vercel.app/signin`, user);
          console.log()
         if(data.message === 'success'){
          localStorage.setItem('userToken',data.token);
          saveUserData()
            setIsLooding(false);
            navigat('/home')
         }
         else{
            setErro(data.message);
            setIsLooding(false)
         }
      }
  
      function submitRegister(e){
       
          e.preventDefault();
         
          let validation = validationRegister();
          setIsLooding(true);
          console.log(validation);
          
           if(validation.error){
            setErrorList(validation.error.details)
            setIsLooding(false);
           }
           else
           {
              sendDataToApi();
              
             
  
           }
  
      }
  
      function validationRegister(){
        let myObj = Joi.object({
       
          email:Joi.string().email({tlds:{allow:['net','com']}}).required(),
          password:Joi.string().pattern(/^[a-z]{3,5}[@][0-9]{3}$/).required(),
  
        });
        return myObj.validate(user ,{abortEarly:false});
        
      }
  
    return <>
    <Helmet>
                  <meta charSet="utf-8" />
                  <title>NeNex</title>
                  <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>
    <div className=" mt-5">
      {erro.length > 0 ?<small className='text-danger'>{erro}</small>:''}
      
      <form className="form" onSubmit={submitRegister} >
        
        <label htmlFor="email">Email : </label>
        <input onChange={getUserData} type="email" name='email'  id='email' className='form-control myinput my-2'/>
        <small className='text-danger d-block py-2'>
          {errorList.filter((error)=> error.context.label == 'email')[0]?.message}
        </small>
        <label htmlFor="password">Password</label>
        <input onChange={getUserData} type="password" name='password'  id='password' className='form-control myinput my-2'/>
        
          {errorList.map((erro)=>{
            if (erro.context.label === 'password'){
              return <small className='text-danger d-block py-2'>Password must start with letter then @ then 3 numbers </small>
            }
          })} 
       
      <button className='register' type='submit'>
        {isLooding?<i className='fas fa-spinner fa-spin'></i>:'login'}
        </button>
      </form>
    </div>
    </>
}
