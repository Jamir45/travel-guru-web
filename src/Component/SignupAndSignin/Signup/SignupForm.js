import React from 'react';
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, LinearProgress, makeStyles, TextField } from '@material-ui/core';
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

const SignupForm = (
   {password, setPassword, values, handleSubmit, onSubmit, handleChange, handleClickShowPassword, handleMouseDownPassword, formLoader}
   ) => {
   const classes = useStyles();
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div>
            <TextField 
               className='form-control my-3'
               id="standard-basic" 
               label="First Name" 
               required
               value={values.firstName}
               onChange={handleChange('firstName')}
            />
         </div>

         <div>
            <TextField 
               className='form-control my-3'
               id="standard-basic" 
               label="Last Name" 
               required
               value={values.lastName}
               onChange={handleChange('lastName')}
            />
         </div>

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
               onBlur={(e) => setPassword(e.target.value) }
               required
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

         <FormControl className={classes.textField+' passwordField'} variant="filled">
            <InputLabel
               className='passwordLabel'
               htmlFor="confirmPassword"
            >
               Confirm Password
            </InputLabel>
            <Input
               id="confirmPassword"
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
            { values.password !== '' && password && password !== values.password && <span className='Error'>Confirm Password Is Not Matched</span> }
         </FormControl>

         {
            formLoader && <LinearProgress className='my-3' />  
         }
         
         { 
            values.password !== '' && password && password !== values.password ? 
            <Button disabled className='singUpOrSignIn mt-3' type="submit" variant="contained">Submit</Button> : 
            <Button className='singUpOrSignIn mt-3' type="submit" variant="contained">Submit</Button>
         }
         <div className='massage'>
            <p>Already have an account? <Link to='/signin'><span>Sign In</span></Link></p>
         </div>
      </form>
   );
};

export default SignupForm;