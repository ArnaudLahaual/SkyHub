// == Import
import './navbar.scss';
import {FaBars} from 'react-icons/fa';
import burgerIcon from '../../../assets/img/logo/burger-menu.svg';
import { NavLink } from 'react-router-dom';

// import helmet from '../../../assets/img/helmet.svg';


// == Composant
function NavBar() {
  return (
    <div className="navbar">
      

        {/* Menu de navigation */}
        <ul className="navbar__menu">
              <li className="navbar__link">

              {/* {({ isActive }) => (isActive ? 'menu-link menu-link--active' : 'menu-link')} */}
                <NavLink to="/" end className={({isActive}) => (isActive ?"hover-underline-animation nav__active" : "hover-underline-animation")}>Accueil</NavLink>
              </li>
              <li className="navbar__link">
                <NavLink to="/sessions" className={({isActive}) => (isActive ?"hover-underline-animation nav__active" : "hover-underline-animation")}>Sessions</NavLink>

              </li>
              {/* <li className="navbar__link">
                <NavLink to="/help" className="hover-underline-animation">Entraide</NavLink>
                </li> */}
              <li className="navbar__link">

                <NavLink to="/posts"  className={({isActive}) => (isActive ?"hover-underline-animation nav__active" : "hover-underline-animation")}>Actualités</NavLink>

              </li>
        </ul>
    </div> 
  );
}

// == Export
export default NavBar;
