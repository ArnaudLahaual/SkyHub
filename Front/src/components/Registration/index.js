// == Import
import './registration.scss';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { changeFieldValue, register } from '../../actions/user';

import areasList from '../../data/areas';

// == Composant
function Registration({

}) 

{


  const dispatch = useDispatch();

  const handleChange = (evt) => {
    dispatch(changeFieldValue(
      evt.target.name,evt.target.value));

    };
  

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(register());
  }

  const { 
    email,
    password,
    nickname,
    firstname,
    lastname,
    city,
    area,
    equipement,
    description 
  } = useSelector((state) => state.user);
    
  return (
    <div className="registration ">
      
      <h1 className='registration__form__title text-3xl text-center'>Formulaire d'inscription</h1>

      <form 
        className='registration__form' 
        onSubmit={handleSubmit}
      >
            
        <label className="registration__form__label">Nom* <span>(non visible par les autres utilisateurs)</span></label>
        <input 
          onChange={handleChange} 
          className="registration__form__field" 
          type="text" 
          name="lastname" 
          placeholder="Nom" 
          value={lastname} 
          required='required'
        />

        <label className="registration__form__label">Prénom* <span>(non visible par les autres utilisateurs)</span></label>
        <input 
          onChange={handleChange} 
          className="registration__form__field" 
          type="text" 
          name="firstname" 
          placeholder="Prénom" 
          value={firstname} 
          required='required'
        />

        <label className="registration__form__label">Pseudo*</label>
        <input 
          onChange={handleChange} 
          className="registration__form__field" 
          type="text" 
          name="nickname" 
          placeholder="Pseudo" 
          value={nickname} 
          required='required'
        />

        <label className="registration__form__label">Email* <span>(non visible par les autres utilisateurs)</span></label>
        <input 
          onChange={handleChange} 
          className="registration__form__field" 
          type="email" 
          name="email" 
          placeholder="email" 
          value={email} 
          required='required'
        />

        <label className="registration__form__label">Mot de passe*</label>
        <input 
          onChange={handleChange} 
          className="registration__form__field" 
          type="password" 
          name="password" 
          placeholder="Mot de passe"
          value={password}
          required='required'
        />

        <label className="registration__form__label">Confirmez le mot de passe*</label>
        <input 
          // onChange={handleChange} 
          className="registration__form__field" 
          type="password" 
          name="passwordConfirm" 
          placeholder="Mot de passe"
          // value={password}
          required='required'
        />

        <label className="registration__form__label">Ville</label>
        <input 
          onChange={handleChange} 
          className="registration__form__field" 
          type="text" 
          name="city" 
          placeholder="Ville" 
          value={city} 
        />

        <label className="registration__form__label">Région</label>
        <select 
          onChange={handleChange} 
          className="registration__form__field" 
          type="text" 
          name="region" 
          placeholder="Région"
          value={area}
        >
          <option value="">-</option>
          {areasList.map((region) => 
            (<option value={region} key={region}>{region}</option>)
          )}
        </select>
          
        <label className="registration__form__label">Description</label>
        <div>
          <textarea 
            onChange={handleChange} 
            className='registration__form__textarea' 
            placeholder="Tout ce qu'il y a à savoir sur vous" 
            value={description} 
            name="description"
          />
        </div>
        
        {/* 
        // Les utilisateurs pourront renseigner leur équipement dans l'input Description plutôt
        <label className="registration__form__label">Equipement d'astronomie</label>
        <div>
          <textarea onChange={handleChange} className='registration__form__textarea' placeholder="Votre équipement" value={equipement} name="equipement"/>
        </div> */}
        
        <button 
          type="submit"
          className="registration__form__submit"
        >
          Valider
        </button>
      </form>
    
    </div>
  );
}


// == Export
export default Registration;
