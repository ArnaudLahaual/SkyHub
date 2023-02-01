// == Import
import './contact.scss';
import cosmoPhone from '../../../assets/img/cosmotel.jpg';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';

// == Composant
function Contact () {
  return (
    <div className="contact">
      <img
          
          className="cosmoPhone"
          src={cosmoPhone}
          alt="cosmoPhone"
        />
      
      <div className='contact__list'>
          <h1 className='contact__list__title' >Contactez nous :</h1>
          <ul className='contact__list__number' >
            <li className='contact__list__number__link'><BsFillTelephoneFill /> 01.00.00.00.01</li>
            <li className='contact__list__number__link'><GrMail/> contact@skyhub.com</li>     
          </ul>
      </div>
        
    </div>
  );
}

// == Export
export default Contact ;
