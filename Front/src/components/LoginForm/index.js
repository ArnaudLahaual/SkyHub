// == Import
import './loginform.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeFieldValue, login } from '../../actions/user';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import cosmoDab from '../../assets/img/cosmo.png';

// == Composant
function LoginForm() {

  const dispatch = useDispatch();

  const handleChange = (evt) => {
    dispatch(changeFieldValue(evt.target.name,evt.target.value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(login());
  };

  const { email,password } = useSelector((state) => state.user);

  return (
    <div className="loginform">
     
      {/* Formulaire Login */}
      <form 
        className="loginform__form"
        onSubmit={handleSubmit}
      >
        
        <h1 className="text-3xl text-center">Connexion</h1>
        
        {/* Champ email */}
        <label className="loginform__form__mail"></label>

        <input onChange={handleChange} className="loginform__form__mail__field border border-solid border-gray-800 rounded-full  my-3" 
          type="text" name="email" placeholder="Email" value={email} />

        {/* Champ Password */}
        <label className="loginform__form__password"></label>

        <input onChange={handleChange} className="loginform__form__password__field border border-solid border-gray-800 rounded-full " 
          type="password" name="password" placeholder="Password" value={password}  />

        <button 
          className="loginform__form__connect rounded-full mt-3"  
          type="submit"
          value="Se connecter"
        >
          Se connecter
        </button>
        
        <div className="create__account">

          <button className="create__account__button rounded-full mt-3 " 
          type="submit" value="Créer un compte" >
          
          <NavLink to='/registration' 
            >Créer un compte</NavLink></button>

          
        </div>

      </form>
    

        <div className="create__image">

          <img className="cosmo__img" src={cosmoDab} />

        </div>



    </div>
  );
}

// == Export
export default LoginForm ;
