// == Import
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addComment , deleteComment } from '../../../actions/comment';
import deleteIcon from '../../../assets/img/trash.svg'
import './comment.scss';


// == Composant
function Comment({ redact, published_at: date , content, id}) {
  const dispatch = useDispatch();

  const { isLogged, nickname} = useSelector((state) => state.user);
  const isCommentRedactor = nickname === redact.nickname;
  
  const dateObj = new Date(date);
  const formatedDate = new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit',minute:'2-digit'}).format(dateObj);

  const handleDeleteComment = () => {
    dispatch(deleteComment(id));
  }

  return (
    <div className='session__comments'>



      <div className='session__comments__data'>

      <NavLink to="/profil/id" className='session__comments__user'>{redact.nickname}</NavLink>
     <time className='session__comments__date'> Posté le {formatedDate}</time>

      </div>
      <div className='session__comments_content'>
      <p className='session__comments__text'>{content}</p>
      </div>

      


      { isCommentRedactor && (
        <div className='session__comments__delete'>
          <img 
          className='session__comments__trashcan'
            src={deleteIcon} 
            onClick={handleDeleteComment}
          />
        </div>
            )
      }
      <div className="session__comments__divider">
      <div className="session__comments__divide"></div>
      </div>

      
      </div>
      
    
  );
}

// == Export
export default Comment ;

