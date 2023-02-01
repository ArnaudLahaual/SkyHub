// == Import
import './articleOverview.scss';
import PropTypesLib from 'prop-types';
import { NavLink } from 'react-router-dom';

// == Composant
function ArticleOverview({ title, published_at:publishedAt, picture, id }) {

  const dateObj = new Date(publishedAt);
  const formatedDate = new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: 'long',day: '2-digit'}).format(dateObj);

  return (
    <div className='article-overview'>
      <div className='article-overview__image-container'>
      <img className='article-overview__image' src={picture} alt='article picture' ></img>
      </div>
      <h2 className='article-overview__title'>{title}</h2>
      <time className="article-overview__date">{formatedDate}</time>
      <NavLink to={`/post/${id}`} className='article-overview__link'>
        Voir l'article
      </NavLink>
    </div>
  );
}

ArticleOverview.propTypes = {
  title: PropTypesLib.string.isRequired,
  published_at: PropTypesLib.string.isRequired,
  picture: PropTypesLib.string,
  id: PropTypesLib.number.isRequired,
};

ArticleOverview.defaultProps = {
  picture: '',
};

// Export
export default ArticleOverview;
