import React from 'react';
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles, LinearProgress, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
   root: {
     display: 'flex',
     flexWrap: 'wrap',
   },
   margin: {
     margin: theme.spacing(1),
   },
   withoutLabel: {
     marginTop: theme.spacing(3)
   },
   textField: {
     width: '100%',
   },
 }));

const SigninForm = (
   {values, handleSubmit, onSubmit, handleChange, handleClickShowPassword, handleMouseDownPassword, formLoader}
   ) => {
   const classes = useStyles();

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div>
            <TextField 
               className='form-control my-3'
               id="standard-basic" 
               label="Username or Email" 
               required
               value={values.email}
               onChange={handleChange('email')}
            />
         </div>

         <FormControl className={classes.textField+' passwordField'} variant="filled">
            <InputLabel
               className='passwordLabel'
               htmlFor="password"
            >
               Password
            </InputLabel>
            <Input
               id="password"
               type={values.showPassword ? 'text' : 'password'}
               value={values.password}
               required
               onChange={handleChange('password')}
               endAdornment={
               <InputAdornment position="end">
                  <IconButton
                     aria-label="toggle password visibility"
                     onClick={handleClickShowPassword}
                     onMouseDown={handleMouseDownPassword}
                  >
                     {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
               </InputAdornment>
               }
            />
         </FormControl>
         <div className="d-flex justify-content-between align-items-center">
            <FormControlLabel
               value="Remember Me"
               control={<Checkbox color="primary" />}
               label="Remember Me"
               labelPlacement="Remember Me"
            />
            <strong>
               <Link style={{color:'orange', cursor:'pointer'}} to="/password/reset">Forgot Password.?</Link>
            </strong>
         </div>
         {
            formLoader && <LinearProgress className='my-3' />  
         }
         <Button  className='singUpOrSignIn mt-3' type="submit" variant="contained">Submit</Button>

         <div className='massage'>
            <p>Create an account? <Link to='/signup'><span style={{color:'orange'}}>Sign Up</span></Link></p>
         </div>
      </form>
   );
};

export default SigninForm;