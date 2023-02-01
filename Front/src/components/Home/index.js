// == Import
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './home.scss';
import SessionOverview from './SessionOverview';
import ArticleOverview from './ArticleOverview';
import banner from '../../assets/img/background/starry-sky.jpg';
import waves from '../../assets/img/waves.svg';


import axios from 'axios';


// == Composant
function Home() {
  const { homeSessions } = useSelector((state) => state.sessions);

  const { homePosts } = useSelector((state) => state.posts);


  return (
    <div className="home">
      
      <div className='home__banner'>
      <img className="banner" src={banner} />
      
      
      </div>
      

      <div className="home__presentation">
       <p className='home__presentation__text'>
         Bienvenue sur Skyhub, 
         c'est ici que vous pourrez rencontrer d'autre passionés d'astronomie, vous rencontrer pour des sessions d'observations et lire les dernières actualités ! 
      
         {/* Bonjour, bienvenue sur notre site d'astronomie SkyHub. Ici vous pourrez rencontrer d'autres AstroLovers lors de sessions d'observation, et vous renseigner sur les dernières news Astro! */}
         </p> 
      </div>

      <section className="home__section">

        <div className="home__sessions">
          <div className="home__sessions__title">
            <h2>Sessions d'observation à venir</h2>
          </div>

          {
            homeSessions.map((session) => (
              <SessionOverview {...session} key={session.id} />
            ))
          }

          {/* <SessionOverview title={'Saturne depuis la lisière de la forêt du bachelard'} city={'Barcelonette'} date={'21 décembre 2022'}/>
          <SessionOverview title={'Orion et raclette à gogo'} city={'Tourcoing'} date={'3 janvier 2023'}/>
          <SessionOverview title={'Dans les étoiles, je vous regarde de là-haut'} city={'Saint-Benoit-les-deux-églises'} date={'21 décembre 202212'}/> */}

          <NavLink to="/sessions" className="home__sessions__link">
            Voir plus de sessions
          </NavLink>
        </div>

        <div className="home__articles">
          <div className='home__articles__title'>
            <h2>Les dernières news Astro</h2>
          </div>

          {
            homePosts.map((post) => (
              <ArticleOverview {...post} key={post.id} />
            ))
          }

          
            {/* <ArticleOverview imageUrl={'https://static.nationalgeographic.fr/files/styles/image_3200/public/01-interstellar-asteroid.webp?w=1600&h=900'}title={'Oumuamua, la maison d\'E.T ?'} date={'30 février 2005'}/>
            <ArticleOverview imageUrl={'https://i.pinimg.com/736x/0a/e1/06/0ae106c7ac42d67acece4f8d09b8b07f.jpg'} title={'Laniakea : sommes-nous vraiment seuls ?'} date={'29 Juin 2022'}/>
            <ArticleOverview imageUrl={'https://resize-public.ladmedia.fr/r/625,416/img/var/public/storage/images/toutes-les-photos/retour-de-la-star-academy-des-images-inedites-des-13-candidats-enfin-devoilees-les-internautes-bluffes-1745612/47061737-1-fre-FR/Retour-de-la-Star-Academy-Des-images-inedites-des-13-candidats-ENFIN-devoilees-Les-internautes-bluffes.jpg'} title={'BREAKING NEWS : LES PARTICIPANTS DE LA STAR ACADEMY NE SERAIENT PAS VRAIMENT DES ETOILES !!!!'} date={'10 mars 2001'}/> */}

          <NavLink to="/posts" className= 'home__articles__link'>
            Voir plus d'articles
          </NavLink>
        </div>
        
      </section>
    </div>
  );
}

// == Export
export default Home;
