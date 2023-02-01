// == Import
import './sessionCard.scss';
import PropTypesLib from 'prop-types';
import { NavLink } from 'react-router-dom';

// == Composant
function SessionCard({ title, propose, picture , city, date , description , id}) {



  // formatage de la date
  const dateObj = new Date(date);
  const formatedDate = new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: 'long',day: '2-digit'}).format(dateObj);

  const slicedDescription = description.slice(0, 200);

  return (
    <div className='session-card'>
      <div className="session-card__picture-container">
        <h2 className='session-card__title'>{title}</h2>
        <img className='session-card__image' src={picture ? picture : 'https://images.immediate.co.uk/production/volatile/sites/4/2021/03/GettyImages-106660395-c-164fe8a.jpg?quality=90&webp=true&resize=940,400'}></img>
      </div>
      <NavLink to="/profil/id" className='session-card__user'>{propose.nickname}</NavLink>
      <p className='session-card__city'>{city}</p>
      <time className='session-card__date'> {formatedDate}</time>
      <p className='session-card__description'>{slicedDescription} [...]</p>

      <NavLink to={`/sessions/${id}`} className='session-card__link'>
        Voir la session
      </NavLink>
    </div>
  );
}

SessionCard.propTypes = {
  title: PropTypesLib.string.isRequired,
  propose: PropTypesLib.shape({
    nickname: PropTypesLib.string.isRequired,
  }).isRequired,
  picture: PropTypesLib.string.isRequired, 
  city: PropTypesLib.string.isRequired,
  date: PropTypesLib.string.isRequired, 
  description: PropTypesLib.string.isRequired,
  id: PropTypesLib.number.isRequired,
};

// == Export
export default SessionCard;
