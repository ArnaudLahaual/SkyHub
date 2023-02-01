// == Import
import './sessions.scss'
import SessionCard from './SessionCard';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilterValue, fetchSessions, fetchSessionsByArea } from '../../actions/sessions';
import { useEffect } from 'react';
import { GrAdd } from 'react-icons/gr';
import { MdAddCircle } from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import Posts from '../Posts';

// == Composant

function Sessions() {



  const dispatch = useDispatch();
  const { dateFilter, regionFilter } = useSelector((state) => state.sessions);
  const { isLogged } = useSelector((state) => state.user);
 



  const handleChange = (evt) => {
    dispatch(changeFilterValue(evt.target.name, evt.target.value));

    if (evt.target.name === "regionFilter") {
      dispatch(fetchSessionsByArea());
    }
    else if (evt.target.name === "dateFilter") {
      console.log('dispatcher le tri par date');
    }
  };


  useEffect(() => {
    dispatch(fetchSessions());
  }, []);
  
  const { listSessions } = useSelector((state) => state.sessions);
  
  return (

    <div className="SessionList">
    
    
      <section className="SessionList__section">

        <div className="SessionList__section__page">
          
          <div className="SessionList__title">
            <h1>Sessions d'observation à venir</h1>
          </div>



          {isLogged && (
              <div className='SessionList__section__add'>
                  <NavLink to="/add" className='SessionList__button' type='button'>Creer une session<MdAddCircle /></NavLink>
              </div>
          )}
            
            
        </div>

          <div className='dropdown__menu'>
          <div className='dropdown__menu__dates'>
              <select className="search__dropdown__date" name="dateFilter" onChange={handleChange}>
                <option value="">Date indifférente</option>
                <option value="asc">Date la plus proche</option>
                <option value="desc">Date la plus lointaine</option>
              </select>
            </div>

            <select className="search__dropdown__region" name="regionFilter" onChange={handleChange}>
              <option value="">Région...</option>
              <option value="Alsace">Alsace</option>
              <option value="Aquitaine">Aquitaine</option>
              <option value="Auvergne">Auvergne</option>
              <option value="Bourgogne">Bourgogne</option>
              <option value="Bretagne">Bretagne</option>
              <option value="Champagne-Ardenne">Champagne-Ardenne</option>
              <option value="Corse-du-sud">Corse-Du-Sud</option>
              <option value="Franche-Comté">Franche-Comté</option>
              <option value="Guadeloupe">Guadeloupe</option>
              <option value="Guyane">Guyane</option>
              <option value="Haute-Corse">Haute-Corse</option>
              <option value="Île-de-France">Île-de-France</option>
              <option value="Languedoc-Roussillon">Languedoc-Roussillon</option>
              <option value="Limousin">Limousin</option>
              <option value="Lorraine">Lorraine</option>
              <option value="Martinique">Martinique</option>
              <option value="Mayotte">Mayotte</option>
              <option value="Midi-Pyrénées">Midi-Pyrénées</option>
              <option value="Nord-Pas-de-Calais">Nord-Pas-de-Calais</option>
              <option value="Basse-Normandie">Basse-Normandie</option>
              <option value="Haute-Normandie">Haute-Normandie</option>
              <option value="Pays de la Loire">Pays de la Loire</option>
              <option value="Picardie">Picardie</option>
              <option value="Poitou-Charentes">Poitou-Charentes</option>
              <option value="Provence-Alpes-Côte d'Azur">Provence-Alpes-Côte d'Azur</option>
              <option value="La Réunion">La Réunion</option>
              <option value="Rhône-Alpes">Rhône-Alpes</option>
            </select>
          </div>

          <div className="SessionList__list">

          {
            listSessions.length === 0 ?
              (<div>Il semblerait qu'il n'y ait pas de session d'observation qui corresponde...</div>) : ''
          }

          {
            listSessions.map((sessions) => (
              <SessionCard {...sessions} key={sessions.id} />
            ))
          }

          </div>

      </section>

  
    </div>
  );
}

// == Export
export default Sessions;
