import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import service from '../../Files/data/serviceData';
import { useData } from '../AuthProvider/AuthProvider';
import './Home.css'

const Home = ({scrollFunc}) => {
   const [selected, setSelected] = useState()

   const aboutFunc = (selectedId) => {
      console.log(selectedId)
      const serviceDetails = service && service.find(data => data.id === selectedId)
      scrollFunc()
      localStorage.setItem('selectedService', JSON.stringify(serviceDetails));
      setSelected(serviceDetails)
   }
   
   const contexts = useData()
   useEffect(() => {
      const old_coords = JSON.parse(localStorage.getItem('selectedService'));
      if (old_coords === null) {
         localStorage.setItem('selectedService', JSON.stringify(service[0]));
      } else {
         const savedProduct = JSON.parse(localStorage.getItem('selectedService'));
         setSelected(savedProduct)
      }
   }, [])

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
  

   return (
      <div className="home">
         <div className="container">
            {contexts.toastMessage()}
            <div className='row service'>
               <div className='col-md-5 text-white'>
                  <h1 className='header'> {selected && selected.title.toUpperCase()} </h1>
                  <p>{selected && selected.description.slice(0,200)}</p>
                  <Button 
                     className='logInBtn' 
                     variant="contained"
                  >
                     <Link to={`/booking/${selected && selected.id}`}>
                        Booking
                     </Link>
                  </Button>
               </div>
               <div className='col-md-7'>
                  <div className='row'>
                  {
                     service && service.map(data => {
                        const {id, img, description} = data
                        return <div className='col-md-4 imgBox'>
                           <img className={selected && selected.id === id ? 'selectedImg' :'serviceImg'} src={img} alt=""/>
                           <div class={selected && selected.id === id ? 'selectedMiddle d-flex' : "middle d-flex"}>
                              <Button 
                                 onClick={() => aboutFunc(id)}
                                 className='imgBtn' 
                                 variant="contained"
                              >
                                 About
                              </Button>
                              <Button 
                                 className='imgBtn' 
                                 variant="contained"
                              >
                                 <Link to={`/booking/${id}`}>
                                 Booking
                                 </Link>
                              </Button>
                           </div>
                        </div>
                     })
                  }
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;