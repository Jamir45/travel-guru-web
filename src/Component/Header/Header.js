import React,{ useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { Button, InputBase } from '@material-ui/core';
import './Header.css'
import logoWhite from '../../Files/travel logo.png'
import logoBlack from '../../Files/Logo.png'
import { useData } from '../AuthProvider/AuthProvider';
import useStyles from './materialStyle';
import UserMenu from './UserMenu';


const Header = React.forwardRef((_, ref) => {
   const contexts = useData()
   const headerColor = contexts.headerColor
   
  const [isSticky, setSticky] = useState(false);
  const [isCollapsed , setCollapsed] = useState(null);

  useEffect(() => {
      window.addEventListener("scroll", () => {
         if(window.scrollY > 50){
         setSticky(true)
         contexts.setHeaderColor(false)
         }else{
            setSticky(false)
            contexts.setHeaderColor(true)
         }
      })
  }, []);

  const classes = useStyles(headerColor);
  
  return (
      <nav ref={ref} className={ (isSticky || isCollapsed) ? `slide in show shadow-md navbar navbar-expand-md bg-light shadow-sm navbar-light fixed-top` : `slide out show navbar navbar-expand-md navbar-light fixed-top ${!headerColor && 'borderBottom'}`}>
         <div className="container">
            {contexts.toastMessage()}
            <Link className="navbar-brand" to="/">
               <img className='img-fluid travelLogo' src={headerColor ? logoWhite : logoBlack} alt=""/>
            </Link>
            <div className={`${classes.search} ${headerColor ? 'searchBox' : 'searchBoxBlack'}`}>
               <div className={`${classes.searchIcon} ${!headerColor && 'textBlack'}`}>
                  <SearchIcon />
               </div>
               <InputBase
                  placeholder="Search…"
                  className={`${!headerColor && 'textBlack'}`}
                  classes={{
                     root: classes.inputRoot,
                     input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
               />
            </div>
            <button 
               onClick={() => setCollapsed(!isCollapsed ? 'slide show' : null )}
               className="navbar-toggler d-lg-none" 
               type="button" 
               data-toggle="collapse" 
               data-target="#collapsibleNavId" 
               aria-controls="collapsibleNavId"
               aria-expanded="false" 
               aria-label="Toggle navigation"
            >
               <span className="navbar-toggler-icon text-white"></span>
            </button>
            
            <div 
               className={`collapse navbar-collapse ${isCollapsed}`}
               id="collapsibleNavId"
            >
               <ul className="row navbar-nav ml-auto mt-2 mt-lg-0">
                  <li className="nav-item col-3">
                     <Link className={headerColor ? "nav-link" : 'nav-link blackText'}>News</Link>
                  </li>
                  <li className="nav-item col-3">
                     <Link className={headerColor ? "nav-link" : 'nav-link blackText'}>Destination</Link>
                  </li>
                  <li className="nav-item col-3 text-right">
                     <Link className={headerColor ? "nav-link" : 'nav-link blackText'}>Blog</Link>
                  </li>
                  <li className="nav-item col-3">
                     <Link className={headerColor ? "nav-link" : 'nav-link blackText'}>Contact</Link>
                  </li>
               </ul>
            </div>
            <UserMenu />
         </div>
      </nav>
     
   );
});

export default Header;