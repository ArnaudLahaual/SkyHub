// == Import
import './profil.scss';

// == Composant
function Profil ( {name, role, img} ) {
  return (
  <div className="team">
      <div className="team__profil">
        
          <img 
            className="team__profil__avatar"
            src={img}>
          </img>

          <h2>{name}</h2>
          <p>{role}</p>
        </div>
  </div>
  );
}

// == Export
export default Profil;
