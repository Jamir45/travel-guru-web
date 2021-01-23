import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Booking.css'
import service from '../../Files/data/serviceData';
import BookingForm from './BookingForm';
import { useData } from '../AuthProvider/AuthProvider';

const Booking = () => {
   const contexts = useData()
   useEffect(() => {
      contexts.setHeaderColor(true)
      window.addEventListener("scroll", () => {
         if(window.scrollY > 50){
           contexts.setHeaderColor(false)
         }else{
            contexts.setHeaderColor(true)
         }
       })
   }, [])

   const params = useParams()
   const serviceBooking = service && service.find(data => data.id === parseFloat(params.serviceID))

   return (
      <div className="home">
         <div className="container">
            {contexts.toastMessage()}
            <div className='row booking'>
               <div className='col-md-6 px-3 py-3 text-white'>
                  <h1 className='header'> 
                     {serviceBooking && serviceBooking.title.toUpperCase()} 
                  </h1>
                  <p>
                     {serviceBooking && serviceBooking.description}
                  </p>
               </div>
               <div className='col-md-6 bookingDiv'>
                  <BookingForm title={serviceBooking && serviceBooking.title} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Booking;