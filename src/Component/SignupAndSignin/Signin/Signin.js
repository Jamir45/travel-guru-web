import { Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { useData } from '../../AuthProvider/AuthProvider';
import CommonForm from '../CommonForm';
import SigninForm from './SigninForm';


const Signin = () => {
   const contexts = useData()

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

   const history = useHistory();
   const location = useLocation();
   const from = location.state ? `${location.state.from.pathname}` : "/";
   // let { from } = location.state || { from: { pathname: "/" } };
   const redirect = () => {
      // history.replace(from)
      history.push(from)
   }

   const [values, setValues] = React.useState({
      email: '',
      password: '',
   });
   const { handleSubmit } = useForm();
   const onSubmit = () => {
      console.log(values)
      const {email, password} = values
      contexts.signWithEmailAndPassword(email, password, redirect)
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
                     <h5 className='Title'>Sign In On Your Account</h5>
                  </div>
                  
                  <SigninForm
                     values={values}
                     handleSubmit={handleSubmit}
                     onSubmit={onSubmit}
                     handleChange={handleChange}
                     handleClickShowPassword={handleClickShowPassword}
                     handleMouseDownPassword={handleMouseDownPassword}
                     formLoader={contexts.formLoader}
                  ></SigninForm>

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

export default Signin;