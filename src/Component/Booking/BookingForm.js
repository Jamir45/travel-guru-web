import { Paper } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useData } from '../AuthProvider/AuthProvider';

const BookingForm = ({title}) => {
   const Contexts = useData()
   const history = useHistory()

   const { register, handleSubmit, watch, errors } = useForm();
   const onSubmit = data => {
      history.push('/search')
      localStorage.setItem('placeName', JSON.stringify(title))
   };

   return (
      <Paper className='formPaper' elevation={3}>
         <form onSubmit={handleSubmit(onSubmit)}>
      
            <div className="inputBox">
               <label htmlFor="origin">Origin</label>
               <input
                  className='form-control Input'
                  id='origin'
                  placeholder='Your Origin'
                  name="origin" 
                  ref={register({ required: true })}
               />
               {errors.origin && <span className='Error'>Origin field is required</span>}
            </div>

            <div className='inputBox'>
               <label htmlFor="destination">Destination</label>
               <input 
                  className='form-control Input'
                  id='destination'
                  placeholder='Destination'
                  name="destination" 
                  ref={register({ required: true })}
               />
               {errors.destination && <span className='Error'>Destination field is required</span>}
            </div>

            <div className='row'>
               <div className='col-6 inputBox'>
                  <label htmlFor="bookingFrom">Booking From</label>
                  <input 
                     className='form-control Input'
                     id='bookingFrom'
                     type='date'
                     name="bookingFrom" 
                     ref={register({ required: true })}
                  />
                  {errors.bookingFrom && <span className='Error'>Booking From is required</span>}
               </div>
               <div className='col-6 inputBox'>
                  <label htmlFor="bookingEnd">Booking To</label>
                  <input 
                     className='form-control Input'
                     id='bookingEnd'
                     type='date'
                     name="bookingFrom" 
                     ref={register({ required: true })}
                  />
                  {errors.bookingFrom && <span className='Error'>Booking To is required</span>}
               </div>
            </div>
            
            <input className='form-control Submit' type="submit" />
         </form>
      </Paper>
   );
};

export default BookingForm;