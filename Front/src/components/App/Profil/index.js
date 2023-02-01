// == Import
import './profil.scss';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/user';
import { NavLink } from 'react-router-dom';
import { fetchSessions } from '../../../actions/sessions';
import { useEffect } from 'react';



// == Composant
function Profil() {
  const dispatch = useDispatch();
  
  function handleClickLogout() {
    dispatch(logout());
  }

  useEffect(() => {
    // récupérer la liste des sessions au montage du composant
    dispatch(fetchSessions())
  }, []);
  
  const { user, sessions: {listSessions} } = useSelector((state) => state)

  // let participateList;
  let proposeList = []; 
  if (listSessions.length > 0 ) {
    // filtrage des sessions dont l'utilisateur connecté est l'auteur
    proposeList = listSessions.filter((session) => 
      user.nickname === session.propose.nickname
    );
    // TODO filtrage des sessions dont l'utilisateur est participant 
    //(il manque les participants dans les données des sessions de sessionsList, voir avec le back pour les recevoir)
  }

  console.log('proposeList', proposeList);

  return (
    <div className="profil">

      <div className="profil__wrapper">
        
        <img 
        className="profil__avatar"
        src='https://cdn3.iconfinder.com/data/icons/earth-and-space/512/astronaut__spaceman-512.png'>
        </img>
        <div className='profil__username'>{user.nickname}</div>
          
        
      
        <div className='profil__infos'>
        <h1 className='profil__infoTitle'>Mes informations</h1>
          <div className='profil__location'>Localisation : {user.region +', ' + user.city}</div>
          <div className='profil__description'>{user.description}</div>
        </div>
        <div className='profil__sessions-suscribed'></div>
        <div className='profil__sessions-created'></div>

        <div className="profil__sessions-lists">

          <div className="profil__sessions-list">
            <h2 className="profil__sessions-list__title">Mes sessions d'observation</h2>

            {proposeList.length === 0 && (
              <p>Vous n'avez pas créé de session d'observation. Faites le en cliquant <NavLink to="/add" className="profil__sessions-list__add">ici</NavLink> !</p>
            )
            }

            {proposeList.length > 0 && (
              proposeList.map((session) => (
                <div className="profil__sessions-list__item">
                  <h3 className="profil__sessions-list__item__title">{session.title}</h3>
                  <p className="profil__sessions-list__item__city">{session.city}</p>
                  <NavLink className="profil__sessions-list__item__link" to={`/sessions/${session.id}`}>Voir la session</NavLink>
                </div>
              ))
            )
            }

          </div>
        </div>

        <NavLink className="profil__edit-link">Modifier mon profil</NavLink>
        <button 
          className='profil__logout'
          onClick={handleClickLogout}
        >
          <h1 className='profil__title'>Déconnexion</h1>
          <div><RiLogoutCircleRLine /></div>
        </button>
        
      </div>
    
     


      

    </div>
  );
}

// == Export
export default Profil;
