// == Import
import { NavLink, useParams } from 'react-router-dom';
import './session.scss';
import Form from './Form';
import Comment from './Comment';
import { useDispatch, useSelector  } from 'react-redux';
import Loading  from '../App/';
import { deleteSession, fetchSession , removeParticipant , addParticipant, editSession } from '../../actions/sessions';
import { useEffect } from 'react';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { AiFillEdit } from "react-icons/ai";




import PropTypesLib from 'prop-types';
import { closeModal, toggleModal} from '../../actions/modal';




 
// == Composant


function Session() {

  const loading = useSelector((state) => state.sessions.loading);
  const { isLogged, nickname } = useSelector((state) => state.user);
  

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSession(id))
    
  },[] ) 

  const handleDelete = (evt) => {
    evt.preventDefault();
    dispatch(deleteSession(id));
  };

  
  
  const {currentSession} = useSelector((state) => state.sessions);
  // console.log(currentSession);
  
  // const { currentSession: { comments} } = useSelector((state) => state.sessions);
  let formatedDate;
  let comments;
  let nbParticipants;
  let isParticipating = false;
  let isRedactor = false;
  
  if (currentSession.date) {
    comments = currentSession.comments;
    nbParticipants = currentSession.users.length;
    const dateObj = new Date(currentSession.date);
    formatedDate = new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit',minute:'2-digit'}).format(dateObj);
    isRedactor =  nickname === currentSession.propose.nickname ? true : false;
  
    // On vérifie si l'utilisateur connecté participe ou non à la session
    currentSession.users.forEach((user) => {
      if ( user.nickname === nickname ) {
        isParticipating = true;
      }
    })
  }

  useEffect(() => {
    dispatch(closeModal());
  }, []);

  function handleToggleModal() {
    dispatch(toggleModal());
  }

  function handleClickParticipate() {
    console.log('je participe');
    dispatch(addParticipant(nickname));
    dispatch(toggleModal());
    nbParticipants += 1;
  }

  function handleClickLeave() {
    console.log('je participe plus');
    dispatch(removeParticipant(nickname));
    dispatch(toggleModal());
    nbParticipants -= 1;
  }

  const { isModalOpen } = useSelector((state) => state.modal);

  console.log(currentSession);
  //TODO Afficher le bouton participer si l'utilisateur n'est pas déjà dans la liste des participants
  
  return (

    
    <div className="session-page">

{ loading && <Loading />}

  {currentSession && !loading && (
    <>
    <section className="session">
        <header className="session__header">
          <h1 className="session__title">{currentSession.title}</h1>
          <div className="session__divider"></div>
          <h3 className="session__author">{currentSession.user}</h3>
          <h4 className='session__postdate'>Posté le 10 Novembre 2022</h4>
        </header>

        <div className="session__picture-container">
        <img 
          className="session__picture"
          src={currentSession.picture ? currentSession.picture : 'https://images.immediate.co.uk/production/volatile/sites/4/2021/03/GettyImages-106660395-c-164fe8a.jpg?quality=90&webp=true&resize=940,400'}
          alt="photo d'illustration sur le theme des étoiles"
          />
        </div>

        <div className="session__content">
          <p>{currentSession.description}</p>
        </div>
        <div className='session__CityRegion'>
        <div className='session__city'> <p>À {currentSession.city}</p> </div>
        <div className='session__city'> <p>{currentSession.region}</p> </div>
        </div>

        <time className="session__date"> Rendez-vous le {formatedDate} </time>
        { isLogged && 

        <div className='session__participation-buttonDiv'> 
        <button className='session__participation-button'  onClick={handleToggleModal}>{isParticipating ? "Me désinscrire de la session" : "M'inscrire à la session"}</button>
        </div>

        }
 
        <p className='session__participant'>{nbParticipants} personnes y participent</p>
        
        {
          !isLogged && (
          <p className='session__logAlert'>
            
              Veuillez vous <NavLink className="session__logLink" to='/registration'>inscrire</NavLink> ou vous <NavLink className="session__logLink" to='/login'>connecter</NavLink> pour participer à la session !
            
          </p>
          )
        }
        
        { isLogged && isModalOpen &&
        
            <div className="session__participation-modal">
              <div className="session__participation-modal__container">
                <p>{!isParticipating ? "Es-tu sûr(e) de vouloir t'inscrire à la session?" : "Es-tu sûr(e) de vouloir te désinscrire de la session?"}</p>
                <div className="session__participation-modal__buttons">
                  <button onClick={isParticipating ? handleClickLeave : handleClickParticipate} className='session__participation-modal__button'>Oui</button>
                  <button onClick={handleToggleModal}  className='session__participation-modal__button'>Non</button>
                </div>
              </div>
            </div>
        } 
                   
  
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d161660.20583921528!2d3.157696!3d50.721039!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c32f2aa229d5f3%3A0x1c0af141f1251770!2s59200%20Tourcoing%2C%20France!5e0!3m2!1sfr!2suk!4v1667919903786!5m2!1sfr!2suk" width="300" height="300" AllowFullScreen="no" loading="lazy" ></iframe>
           */}
        


        
      </section>

        <div className='session__commentZone'>
         <div className="session__commentZone__divider"></div>
        <p className='session__commentZone__text'>&#10024; Espace Commentaires &#10024;</p>
         </div>

          {
            comments && 
            comments.map((comment) => (
              <Comment {...comment} key={comment.content} />
              ))
            }

      {
      !isLogged && (
        <p className='session__logAlert'>
          
            Veuillez vous <NavLink className="session__logLink"   to='/registration'>inscrire</NavLink> ou vous <NavLink className="session__logLink"  to='/login '>connecter</NavLink> pour commenter !
          
        </p>
        )
      }
        

      {isLogged && (
        <Form/>
      )
      }
    </>
  )}


{
  isRedactor && (
    <div className='session__interaction'>
      <><div className='session__interaction__delete'>
            <button onClick={handleDelete} className='session__interaction__delete__button' type='button'>Supprimer la session <RiDeleteBack2Fill /></button>
      </div>
          
          <div className='session__interaction__edit'>
              <NavLink to={`/edit/${id}`} className='session__interaction__edit__button' type='button'>Editer la session <AiFillEdit /></NavLink>
          </div></>
    </div>
)

}
  
    </div>
  );
}

// Session.propTypes = {
//   title: PropTypesLib.string.isRequired,
//   description: PropTypesLib.string.isRequired,
//   propose: PropTypesLib.shape({
//     nickname: PropTypesLib.string.isRequired,
//   }).isRequired,
// };


// == Export
export default Session;
