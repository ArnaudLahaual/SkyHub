// == Import
import './error.scss';
import Errorsvg from '../../../assets/img/error.svg';
import image from '../../../assets/img/lost.png'


function Error() {
  return (
    <div className="error">

      <div className='error'>
        <img src={image} alt=''></img>
        <p className='error__text'>404</p>
        <p>Mauvaise destination</p>
      </div>
    </div>
  );
}

// == Export
export default Error;
