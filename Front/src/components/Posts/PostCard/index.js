// == Import
import './postcard.scss';
import PropTypesLib from 'prop-types';
import { NavLink } from 'react-router-dom';

// == Composant
function PostCard({ title, published_at, picture, id }) {

  const dateObj = new Date(published_at);
  const formatedDate = new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: 'long',day: '2-digit'}).format(dateObj);

  return (
    <div className='postcard'>
      <div className='postcard__image-container'>
        <img className='postcard__image' src={picture}></img>
      </div>
      <div className="postcard__info">
        <h2 className='postcard__title'>{title}</h2>
        <time className="postcard__date">Posté le {formatedDate}</time>
        <NavLink to={`/post/${id}`} className='postcard__link'>
          Voir l'article
        </NavLink>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  title: PropTypesLib.string.isRequired,
  published_at: PropTypesLib.string.isRequired,
  picture: PropTypesLib.string.isRequired,
  id: PropTypesLib.number.isRequired,
};
// Export
export default PostCard;
