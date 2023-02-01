
import './styles.scss';
import { Route, Routes, useLocation } from 'react-router-dom';


import Home from '../Home';
import Header from '../Header';
import Footer from '../Footer';
import Team from '../Footer/Team';

import Sessions from '../Sessions';
import LoginForm from '../LoginForm';
import Posts from '../Posts';
import Session from '../Session';
import Post from '../Post';
import Registration from '../Registration';
import Contact from '../Footer/Contact';
import Mentions from '../Footer/Mentions';
import Profil from './Profil';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchHomeSessions, fetchSessions, fetchSession } from '../../actions/sessions';
import { fetchHomePosts, fetchPosts } from '../../actions/posts';
import { fetchComment  } from '../../actions/comment';
import Loading from './Loading';
import { connectUser, logout } from '../../actions/user';
import SectionForm from '../SectionForm';
import EditSession from './EditSession';
import Error from './Error';

// Assets

// == Composant
function App() {

  const loading = useSelector((state) => state.sessions.loading);
  console.log(loading);
  
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(
    () => {
      // Ici on remonte le navigateur en haut
      window.scrollTo(0, 0);
    },
    // On rajoute une dépendance dans le tableau.
    // Du coup la callback au dessus se déclenchera à chaque modification de la valeur de location
    [location],
  );

  useEffect(() => {
    dispatch(fetchHomeSessions());
    dispatch(fetchHomePosts());
    dispatch(fetchPosts());
    dispatch(fetchSessions());
    dispatch(fetchComment());
  }, []);

  // Récupération des données utilisateur depuis le session storage

  useEffect(() => {
    // Au premier montage du composant
    // On regarde s'il y a un token dans le session storage
    console.log(sessionStorage);
    if ( sessionStorage.getItem('token') ) {
      // Si oui, on vérifie si l'heure actuelle dépasse l'heure d'expiration du token.
      const expirationTime = sessionStorage.getItem('expirationTime');
      const currentTime = Date.now();
      // Si l'heure dépasse, on déconnecte l'utilisateur (surtout on nettoie le session storage)
      if (currentTime >= expirationTime) {
        // logout() vide le state mais surtout il vide le session storage
        dispatch(logout());
      }
      // Si l'heure dépasse pas
      else {
        //on récupère les données du session storage
        const id = sessionStorage.getItem('id');
        const lastname = sessionStorage.getItem('lastname');
        const firstname = sessionStorage.getItem('firstname');
        const email = sessionStorage.getItem('email');
        const nickname = sessionStorage.getItem('nickname');
        const city = sessionStorage.getItem('city');
        const region = sessionStorage.getItem('region');
        const description = sessionStorage.getItem('description');
        const profil_picture = sessionStorage.getItem('profil_picture');
        const token = sessionStorage.getItem('token');

        // pour les mettre dans le state (connectUser)
        dispatch(connectUser(
          id,
          lastname,
          firstname,
          email, 
          nickname,
          city,
          region, 
          description,
          profil_picture,
          token
        ))
      }
    }
  },[])
  
  return (
    <div className="app">
    
    {loading && <Loading />}

    {!loading && (
      <>

      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/*" element={<Error/>} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/sessions/:id" element={<Session />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions" element={<Mentions />} />
          <Route path="/add" element={<SectionForm />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/edit/:id" element={<EditSession />} />
        </Routes>
      </main>
      <Footer />
      </>
      )}
    </div>
  );
}

// == Export
export default App;
