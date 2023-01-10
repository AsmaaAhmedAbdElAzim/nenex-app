import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {
    let navigat = useNavigate();
    const [errorList, setErrorList] = useState([])
    const [isLooding, setIsLooding] = useState(false);
      const [erro, setErro] = useState('');
      const [user, setUser] = useState({
          first_name:'',
          last_name:'',
          age:0,
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
          let {data} = await axios.post('https://sticky-note-fe.vercel.app/signup', user);
         if(data.message === 'success'){
            setIsLooding(false);
            navigat('/login')
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
          first_name:Joi.string().min(3).max(10).required(),
          last_name:Joi.string().min(3).max(10).required(),
          age:Joi.number().min(16).max(60).required(),
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
        <label htmlFor="first_name">Frist Name :</label>
        <input onChange={getUserData} type="text" name='first_name'  id='first_name' className='form-control myinput my-2'/>
        <small className='text-danger d-block py-2'>
          {errorList.filter((error)=> error.context.label === 'first_name')[0]?.message}
        </small>
        
        <label htmlFor="last_name">Last Name :</label>
        <input onChange={getUserData} type="text" name='last_name'  id='last_name' className='form-control myinput my-2'/>
        <small className='text-danger d-block py-2'>
          {errorList.filter((error)=> error.context.label === 'last_name')[0]?.message}
        </small>
        <label htmlFor="age">Age :</label>
        <input onChange={getUserData} type="number" name='age'  id='age' className='form-control myinput my-2 '/>
        <small className='text-danger d-block py-2'>
          {errorList.filter((error)=> error.context.label === 'age')[0]?.message}
        </small>
        <label htmlFor="email">Email : </label>
        <input onChange={getUserData} type="email" name='email'  id='email' className='form-control myinput my-2'/>
        <small className='text-danger d-block py-2'>
          {errorList.filter((error)=> error.context.label === 'email')[0]?.message}
        </small>
        <label htmlFor="password">Password</label>
        <input onChange={getUserData} type="password" name='password'  id='password' className='form-control myinput my-2'/>
        
          {errorList.map((erro)=>{
            if (erro.context.label === 'password'){
              return <small className='text-danger d-block py-2'>Password must start with letter then @ then 3 numbers </small>
            }
          })} 
       
      <button className='register' type='submit'>
        {isLooding?<i className='fas fa-spinner fa-spin'></i>:'Register'}
        </button>
      </form>
    </div>
    </>
}
