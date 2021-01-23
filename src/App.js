import React, { useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { DataContextProvider } from "./Component/AuthProvider/AuthProvider";
import Booking from "./Component/Booking/Booking";
import Header from "./Component/Header/Header";
import Home from "./Component/Home/Home";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import SearchHotel from "./Component/SearchHotel/SearchHotel";
import Signin from "./Component/SignupAndSignin/Signin/Signin";
import Signup from "./Component/SignupAndSignin/Signup/Signup";
import PasswordReset from "./Component/PasswordReset/PasswordReset";

function App() {
  // Scroll Top and Down
  const scrollToResultDiv = useRef()
  const scrollFunc = () => {
    window.scrollTo({
        top: scrollToResultDiv.current.offsetTop,
        left: 0,
        behavior: "smooth",
    })
  }

  return (
    <DataContextProvider>
      <Router>
        <Header ref={scrollToResultDiv}></Header>
        <Switch>
          <Route exact path='/'>
            <Home scrollFunc={scrollFunc} />
          </Route>
          <Route path='/booking/:serviceID'>
            <Booking />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/password/reset'>
            <PasswordReset />
          </Route>
          <PrivateRoute path='/search'>
            <SearchHotel />
          </PrivateRoute>
        </Switch>
      </Router>
    </DataContextProvider>
  );
}

export default App;
