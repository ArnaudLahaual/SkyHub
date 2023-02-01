// == Import
import './team.scss';
import profils from '../../../data/profils';
import Profil from './Profil';
import teamImage from '../../../assets/img/team.svg'

// == Composant
function Team () {

  console.log(profils);
  return (
    <div className="team">
      <div className='team__picture'>
        <img className="team__picture__image" src={teamImage} alt=''></img>
        </div>
      {/* {
          profils.map((profil) => (
            <Profil {...profil} key={profil.id} />
          ))
        } */}

</div>
  );
}

// == Export
export default Team ;
