// == Import
import './sessionOverview.scss';
import PropTypesLib from 'prop-types';
import { NavLink } from 'react-router-dom';

// == Composant
function SessionOverview({ title, city, date, id }) {
  // formatage de la date
  const dateObj = new Date(date);
  const formatedDate = new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: 'long',day: '2-digit'}).format(dateObj);

  return (
    <div className='session-overview'>
      <h2 className='session-overview__title'>{title}</h2>
      <p className="session-overview__city">{city}</p>
      <p className="session-overview__date">{formatedDate}</p>
      <NavLink to={`/sessions/${id}`} className='session-overview__link'>
        Voir la session
      </NavLink>
    </div>
  );
}

SessionOverview.propTypes = {
  title: PropTypesLib.string.isRequired,
  city: PropTypesLib.string.isRequired,
  date: PropTypesLib.string.isRequired,
  id: PropTypesLib.number.isRequired,
};

// == Export
export default SessionOverview;
