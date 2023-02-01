// == Import
import { NavLink } from 'react-router-dom';
import ArticleOverview from '../Home/ArticleOverview';
import PostCard from '../Posts/PostCard';
import {  useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './post.scss';
import { findPost } from '../../selectors/posts';
import { fetchPosts } from '../../actions/posts';

// == Composant
function Post() {

  const { id } = useParams();
  //console.log(id);

  const post = useSelector((state) => findPost(state.posts.listPosts, id));

  const { listPosts } = useSelector((state) => state.posts);

  //console.log(listPosts);
  console.log(post);

  let formatedDate;
  if (post) {
    const dateObj = new Date(post.published_at);
    formatedDate = new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: 'long',day: '2-digit'}).format(dateObj);
  }

  return (
    <div className="post-page">

    { post && (
      <section className="post">
        <header className="post__header">
          <h2 className="post__title">{post.title}</h2>
          <div className="divider"> </div>
          <h3 className="post__author">écrit par {post.redact.nickname}</h3>
        </header>

      <div className="post__picture-container">
        <img 
          className="post__picture"
          src={post.picture}
          alt=""
        />
      </div>
        <div className="post__content">
          <p>{post.content}</p>
        </div>
        <time className="post__date">Posté le {formatedDate}</time>
      </section>
    )
    
    }

      <section className="posts-overview">
        {/* <div className='posts-overview__title'>
          <h2>Découvrez d'autres articles</h2>
        </div>
        <PostCard
          imageUrl={'https://static.nationalgeographic.fr/files/styles/image_3200/public/01-interstellar-asteroid.webp?w=1600&h=900'}
          title={'Oumuamua, la maison d\'E.T ?'}
          date={'30 février 2005'}
          id={1}
        />
        <PostCard
          imageUrl={'https://i.pinimg.com/736x/0a/e1/06/0ae106c7ac42d67acece4f8d09b8b07f.jpg'} 
          title={'Laniakea : sommes-nous vraiment seuls ?'} 
          date={'29 Juin 2022'}
          id={2}
        />
        <PostCard
          imageUrl={'https://resize-public.ladmedia.fr/r/625,416/img/var/public/storage/images/toutes-les-photos/retour-de-la-star-academy-des-images-inedites-des-13-candidats-enfin-devoilees-les-internautes-bluffes-1745612/47061737-1-fre-FR/Retour-de-la-Star-Academy-Des-images-inedites-des-13-candidats-ENFIN-devoilees-Les-internautes-bluffes.jpg'} 
          title={'BREAKING NEWS : LES PARTICIPANTS DE LA STAR ACADEMY NE SERAIENT PAS VRAIMENT DES ETOILES !!!!'} 
          date={'10 mars 2001'}
          id={3}
        /> */}
        <NavLink to="/posts" className='posts-overview__link'>
          Voir plus d'articles
        </NavLink>
      </section>

    </div>
  );
}

// == Export
export default Post;
