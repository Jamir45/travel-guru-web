import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useData } from '../AuthProvider/AuthProvider';

const PrivateRoute = ({ children, ...rest }) => {
   const auth = useData();
   const user = auth.user

   return (
     <Route
       {...rest}
       render={({ location }) =>
         (user || sessionStorage.getItem('userToken')) ? (
            children
         ) : (
           <Redirect
             to={{
               pathname: "/signin",
               state: { from: location }
             }}
           />
         )
       }
     />
   );
 }

export default PrivateRoute;