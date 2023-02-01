// == Import

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { logout } from '../../../actions/user';
import user from '../../../middlewares/user';

import './navbarmobile.scss';

// == Composant
function NavBarMobile() {

  const {isBurgerOpen} = useSelector((state) => state.skyhub);
  console.log(isBurgerOpen);

  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='navbar-mobile'>
      <ul className='navbar-mobile__list'>
        <li>
          <NavLink to="/" className='navbar-mobile__list__link'>ACCUEIL</NavLink>
        </li>
        <li>
          <NavLink to="/sessions" className='navbar-mobile__list__link'>SESSIONS</NavLink>
        </li>
        {/* <li>
          <NavLink to="/questions" className='navbar-mobile__list__link'>ENTRAIDE</NavLink>
        </li> */}
        <li>
          <NavLink to="/posts" className='navbar-mobile__list__link'>ACTUALITES</NavLink>
        </li>
        {!isLogged && (
          <li>
          <NavLink to="/login" className='navbar-mobile__list__link'>CONNEXION</NavLink>
        </li>
          )  
        }
        


        {isLogged && (
        <>
          <li>
            <NavLink to="/profil" className='navbar-mobile__list__link'>MON PROFIL</NavLink>
          </li>
          <li>
            <button 
              className='navbar-mobile__list__logout'
              onClick={handleLogout}
            >SE DECONNECTER</button>
          </li>
        </>
        )}
      </ul>
    </div>
    
  );
}

// == Export
export default NavBarMobile;
