import axios from 'axios';
import { connectUser, LOGIN, LOGOUT, REGISTER } from "../actions/user";

const user = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      const { user: { email, password } } = store.getState();

      console.log(email, password);

      axios.post('http://localhost:8000/api/login', {
        email: email,
        password: password,
      })
        .then((response) => {

          if (response.status === 200) {
            // Récupération des données de l'utilisateur
            const userData = response.data.data;
            const token = response.data.token;
            // console.log(response);
            console.log(response);
  
            // Enregistrement des données de l'utilisateur dans le state
            store.dispatch(connectUser(
              userData.id,
              userData.lastname,
              userData.firstname,
              userData.email, 
              userData.nickname,
              userData.city,
              userData.region, 
              userData.description,
              userData.profil_picture,
              token
            ));
  
            // Enregistrement des données de l'utilisateur dans le session storage
            sessionStorage.setItem('id', userData.id);
            sessionStorage.setItem('lastname', userData.lastname);
            sessionStorage.setItem('firstname', userData.firstname);
            sessionStorage.setItem('email', userData.email);
            sessionStorage.setItem('nickname', userData.nickname);
            sessionStorage.setItem('city', userData.city);
            sessionStorage.setItem('region', userData.region);
            sessionStorage.setItem('description', userData.description);
            sessionStorage.setItem('profil_picture', userData.profil_picture);
            sessionStorage.setItem('token', token);

            // Enregistrement d'un marqueur temporel équivalent à une heure après la connexion
            // Date.now() = le nombre de millisecondes écoulées depuis le 01/01/1970. On y ajoute une heure.
            // (le token expire après 60 min)
            sessionStorage.setItem('expirationTime', Date.now() + 3600000);

            // Redirection de l'utilisateur vers la page d'accueil
            location.href = '/';
          }
        })
        .catch((error) => {
          console.log(error);
        })

      next(action);
      break;
    }

    case LOGOUT: {
      // Lorsque l'utilisateur déconnecte, on vide le session storage
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('lastname');
      sessionStorage.removeItem('firstname');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('nickname');
      sessionStorage.removeItem('city');
      sessionStorage.removeItem('region');
      sessionStorage.removeItem('description');
      sessionStorage.removeItem('profil_picture');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('expirationTime');

      // On redirige vers la page d'accueil
      location.href = '/';

      next(action);
      break;
    }

    case REGISTER: {
      const { user } = store.getState();
      console.log(user);

      axios.post('http://localhost:8000/api/signup', {
        email: user.email,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        nickname: user.nickname,
        city: user.city,
        region: user.region,
        description: user.description,
      })
      .then((response) => {
        location.href = '/login';
        console.log(response);
      })
      .catch((error) => console.log(error))

      next(action);
      break;
    }

    default:
      next(action);
      break;
  }
};

export default user;
