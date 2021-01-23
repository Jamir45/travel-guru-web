import { LinearProgress, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Signup.css'
import CommonForm from '../CommonForm';
import { useData } from '../../AuthProvider/AuthProvider';
import SignupForm from './SignupForm';
import { useHistory } from 'react-router-dom';

const Signup = () => {
   const contexts = useData()
   const history = useHistory()

   useEffect(() => {
      contexts.setHeaderColor(false)
      window.addEventListener("scroll", () => {
         if(window.scrollY > 50){
           contexts.setHeaderColor(false)
         }else{
            contexts.setHeaderColor(false)
         }
       })
   }, [])
   
   const [password, setPassword] = useState()
   const [values, setValues] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      showPassword: false,
   });
   const { handleSubmit } = useForm();
   const onSubmit = () => {
      console.log(values)
      const {firstName, lastName, email, password} = values
      const name = `${firstName} ${lastName}`
      contexts.signUpWithEmailAndPassword(name, email, password, history)
      contexts.setFormLoader(true)
   };

   const handleChange = (prop) => (event) => {
   setValues({ ...values, [prop]: event.target.value });
   };

   const handleClickShowPassword = () => {
   setValues({ ...values, showPassword: !values.showPassword });
   };

   const handleMouseDownPassword = (event) => {
   event.preventDefault();
   };

   return (
      <div className="container">
         {contexts.toastMessage()}
         <div className='row signUpSingInForm'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
               <Paper className='signupPaper' elevation={3}>
                  <div className="text-center">
                     <h5 className='Title'>Create an account</h5>
                  </div>

                  <SignupForm
                     password={password} 
                     setPassword={setPassword}
                     values={values}
                     handleSubmit={handleSubmit}
                     onSubmit={onSubmit}
                     handleChange={handleChange}
                     handleClickShowPassword={handleClickShowPassword}
                     handleMouseDownPassword={handleMouseDownPassword}
                     formLoader={contexts.formLoader}
                  ></SignupForm>   

                  <div className='row orOptionDiv'>
                     <span className='orOption col-5'></span>
                     <span className='col-2 text-center'>OR</span>
                     <span className='orOption col-5'></span>
                  </div>
                  <CommonForm></CommonForm>
               </Paper>
            </div>
            <div className='col-md-3'></div>
         </div>
      </div>
   );
};

export default Signup;