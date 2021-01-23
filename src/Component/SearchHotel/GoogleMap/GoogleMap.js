import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const Map = ({hotels}) => {

   const containerStyle = {
      width: '100%',
      height: '500px'
   };
   const onLoad = marker => {
      console.log('marker: ', marker)
   }

   const positionArr = hotels.map(hotel => {
   const position3 = {
      lat: hotel.lat,
      lng: hotel.long
      };
      return position3
   })

   return (
      <div className='mt-5'>
         <LoadScript
            googleMapsApiKey="AIzaSyBb6wjKD210p0ORAaFyC1EBxF1yJrpLuzk"
         >
         <GoogleMap
            mapContainerStyle={containerStyle}
            center={positionArr[1]}
            zoom={13}
         >
            {
               positionArr && positionArr.map(position => {
                  return <Marker
                     onLoad={onLoad}
                     position={position}
                  />
               })
            }
         </GoogleMap>
         </LoadScript>
      </div>
    );
};

export default Map;