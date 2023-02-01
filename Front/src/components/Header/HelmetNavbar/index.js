// == Import
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../actions/user';
import './helmetNavbar.scss';

// == Composant
function HelmetNavbar () {

  const dispatch=useDispatch();
  const { isLogged } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="helmetnavbar">
      <ul className='helmetnavbar__list'>

{!isLogged && (
          <>
          
          <li>
            <NavLink to="/login" className='helmetnavbar__list__link'>CONNEXION</NavLink>
          </li>
          
          <li>
              <NavLink to="/registration" className='helmetnavbar__list__link'>INSCRIPTION</NavLink>
          </li></>
)}
        
        {isLogged && (
          <><li>
            <NavLink to="/profil" className='helmetnavbar__list__link'>MON PROFIL</NavLink>
          </li><li>
              <button
                onClick={handleLogout}
                className='helmetnavbar__list__logout'
              >SE DECONNECTER</button>
            </li></>
          
          )}

        </ul>
    </div>
  );
}

// == Export
export default HelmetNavbar ;
