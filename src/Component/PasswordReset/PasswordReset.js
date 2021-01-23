import { Button, LinearProgress, Paper, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useData } from '../AuthProvider/AuthProvider';

const PasswordReset = () => {
   const history = useHistory()
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

   const [values, setValues] = React.useState({email: ''});
   const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
   };

   const { handleSubmit } = useForm();
   const onSubmit = () => {
      console.log(values)
      const {email} = values
      contexts.setFormLoader(true)
      contexts.resetPassword(email, history)
   };

   return (
      <div className='container mt-5 pt-5'>
         {contexts.toastMessage()}
         <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
               <Paper className='signupPaper' elevation={3}>
                  <div className="text-center">
                     <h5 className='Title'>Reset Your Password</h5>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <TextField 
                        className='form-control my-3'
                        id="standard-basic" 
                        label="Type Your Email" 
                        required
                        value={values.email}
                        onChange={handleChange('email')}
                     />
                     {
                        contexts.formLoader && <LinearProgress className='my-3' />  
                     }
                     <Button 
                        className='singUpOrSignIn mt-3' 
                        type="submit" 
                        variant="contained"
                     >
                        Submit
                     </Button>
                  </form>
               </Paper>
            </div>
            <div className='col-md-3'></div>
         </div>
      </div>
   );
};

export default PasswordReset;