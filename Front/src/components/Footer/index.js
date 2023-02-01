// == Import
import './footer.scss';
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle , AiFillInstagram} from "react-icons/ai";
import { HiMail } from "react-icons/hi";
import { NavLink } from 'react-router-dom';
import waves from '../../assets/img/waves.svg'

// == Composant
function Footer() {
  return (
    <div className="footer">
      <img className='footer__waves' src={waves} />
      <div className="footer__infos">
        {/* Menu de navigation */}
        <ul className="footer__links">
              <li className="footer__link"> 
                <NavLink to='/team'>Qui sommes nous ?</NavLink> 
              </li>
              <li className="footer__link"> 
                <NavLink to='/contact'>Contactez nous!</NavLink> 
              </li>
              <li className="footer__link"> 
                <NavLink to='/mentions'>Mentions légales</NavLink> 
              </li>
        </ul>


        <ul className='footer__social'>
            <li className='footer__social__links'><NavLink to='#Facebook'><BsFacebook /></NavLink></li>
            <li className='footer__social__links'><NavLink to='Twitter'><AiFillTwitterCircle /></NavLink></li>
            <li className='footer__social__links'><NavLink to='Instagram'><AiFillInstagram /></NavLink></li>
            <li className='footer__social__links'><NavLink to='Mail'><HiMail /></NavLink></li>
        </ul>
        <p  className='footer__text' ><a href='https://www.youtube.com/watch?v=Le9Q7cy331A&ab_channel=IlonaOfficiel'>SkyHub</a> made with ☆</p>
      </div>

    </div>
  );
}

// == Export
export default Footer;
