// == Import
import './header.scss'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { closeBurger, closeHelmet, toggleBurger, toggleHelmet } from '../../actions/skyhub';
import { NavLink } from 'react-router-dom';

import NavBar from './NavBar';
import NavBarMobile from './NavBarMobile';

import logo from '../.././assets/img/logo/skyhub-logo.svg';
import title from '../.././assets/img/logo/Skyhub20050.svg';
import helmet from '../.././assets/img/user.svg';
import burgerIcon from '../../assets/img/logo/burger-menu.svg';
import HelmetNavbar from './HelmetNavbar';
import { BsPersonCheckFill } from 'react-icons/bs';


// == Composant
function Header() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  // Si on change de page, le menu burger se ferme.
  useEffect(() => {
    dispatch(closeBurger());
  }, [pathname]);

  useEffect(() => {
    dispatch(closeHelmet());
  }, [pathname]);

  function handleClick() {
    dispatch(toggleBurger());
  }

  function handleClickHelmet() {
    dispatch(toggleHelmet());
  }

  const { isBurgerOpen,isHelmetOpen } = useSelector((state) => state.skyhub);
  const {nickname, isLogged } = useSelector((state) => state.user);
  console.log(nickname);

  return (
    <div className="header">
      <div className="header__nav">
        <div className='header__logos'>
        <img className="header__logo" src={title} alt="Skyhub" />
        </div>
        
        <NavBar />

  { isLogged &&
      <div className='header__profil'>
        <p className='header__profil__nickname' onClick={handleClickHelmet} >  <BsPersonCheckFill  size={30} />{nickname}</p>
      </div>
  }
        <img
          onClick={handleClick}
          className="burger-icon"
          src={burgerIcon}
          alt="burger menu icon"
        />




{ !isLogged &&
            <img
            onClick={handleClickHelmet}
              className="helmet"
              src={helmet}
              alt="helmet"
            />
}

      
      </div>

      { isBurgerOpen && <NavBarMobile /> }

      { isHelmetOpen && <HelmetNavbar /> }
    
  
    </div>
  );
}

// == Export
export default Header;
