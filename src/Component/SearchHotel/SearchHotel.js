import React, { useEffect } from 'react';
import hotelData from '../../Files/data/hotelData';
import { useData } from '../AuthProvider/AuthProvider';
import './SearchHotel.css'
import StarIcon from '@material-ui/icons/Star';
import Map from './GoogleMap/GoogleMap';

const SearchHotel = () => {
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
      const getPlace = localStorage.getItem('placeName')
      contexts.setPlace(JSON.parse(getPlace))
   }, [])
   
   const hotels = hotelData && hotelData.filter(data => data.category === contexts.place ? contexts.place : '')
   console.log(hotels)

   return (
      <div className='container'>
         {contexts.toastMessage()}
         <div className='row hotelSearch'>
            <div className='col-md-6'>
               <h4>Stay in {contexts.place}</h4>
               {
                  hotels && hotels.map(hotel => {
                     return <div className='row py-3'>
                        <div className='col-6'>
                           <img className='img-fluid' src={hotel.image} alt=""/>
                        </div>
                        <div className='col-6'>
                           <h5> {hotel.hotelName} </h5>
                           <p className='details'> {hotel.capacity} </p>
                           <p className='details'> {hotel.facilities} </p>
                           <p className='details'> {hotel.commit} </p>
                           <p className='d-flex justify-content-between'> 
                              <span><StarIcon className='starIcon'/> {hotel.starRating}(20)</span> 
                              <span>Price: <b>${hotel.costPerNight}</b>/Night</span> 
                           </p>
                        </div>
                     </div>
                  })
               }
            </div>
            <div className='col-md-6'>
               {
                  hotels && <Map hotels={hotels}></Map>
               }
            </div>
         </div>
      </div>
   );
};

export default SearchHotel;