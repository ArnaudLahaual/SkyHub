import axios from 'axios';
import slugify from 'react-slugify';

import {REMOVE_PARTICIPANT, ADD_PARTICIPANT, FETCH_HOME_SESSIONS, FETCH_SESSIONS, FETCH_SESSIONS_BY_AREA, FETCH_SESSION, saveHomeSessions, saveSessions, saveSession, saveSessionsByArea, ADD__SESSION, DELETE__SESSION, deleteSession, EDIT__SESSION } from '../actions/sessions';
import { addComment, ADD_COMMENT, DELETE_COMMENT, saveComment } from '../actions/comment';



const sessions = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_HOME_SESSIONS: {
      axios.get('http://localhost:8000/api/next/session/list')
        .then((response) => {
          store.dispatch(saveHomeSessions(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

      next(action);
      break;
    }

    case FETCH_SESSIONS: {
      axios.get('http://localhost:8000/api/session/list')
        .then((response) => {
          store.dispatch(saveSessions(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

      next(action);
      break;
    }

    case FETCH_SESSIONS_BY_AREA: {
      const { sessions: { regionFilter } } = store.getState();
      const areaSlug = slugify(regionFilter);
      axios.get(`http://localhost:8000/api/sessions/region/${areaSlug}`)
        .then((response) => {
          store.dispatch(saveSessionsByArea(response.data));
        })
        .catch((error) => console.log(error))
    }

    case FETCH_SESSION: {

        const id = action.id;
        
        console.log(id);
        axios.get(`http://localhost:8000/api/session/${id}`)
          .then((response) => {
            store.dispatch(saveSession(response.data));
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

      next(action);
      break;
    }


    case ADD_PARTICIPANT: {
      const { sessions: {currentSession: { id: sessionId } }, user: {id: userId} } = store.getState();

      axios.get(`http://localhost:8000/api/sessions/${sessionId}/subscribe/${userId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

      next(action);
      break;
    }

    case REMOVE_PARTICIPANT: {
      // TODO Requête API pour supprimer l'utilisateur connecté de la liste des participants de la session courante
    }

    case ADD__SESSION: {

      const { user} = store.getState();
      const date = user.sessionDate + user.sessionTime;

      const bodyParameter = {
        title : user.sessionTitle, 
        description:user.sessionDescription,
        date,
        time:user.sessionTime, 
        city:user.sessionCity,
        region:user.sessionRegion,
        propose: user.id,
      }

    console.log(bodyParameter);
    console.log(user);
      axios.post('http://localhost:8000/api/session/new', bodyParameter
      )

      .then((response) => {
        
        console.log(response.data.id);
        location.href = `/sessions/${response.data.id}`;
      })
      .catch((error) => console.log(error))


      next(action);
      break;
    }

    case ADD_COMMENT: {
      const { user: { sessionComment, id: userId, nickname }, sessions: { currentSession } } = store.getState();
      const id = currentSession.id

      const bodyParameter = {
        content: sessionComment,
        redact: parseInt(userId),
        has: id,   
      }

      axios.post(`http://localhost:8000/api/session/${id}/comment/new`, bodyParameter)
      .then ((response) => {
        console.log(response);
        store.dispatch(saveComment(nickname, sessionComment, response.data.id));
      })
      .catch ((error) => console.log(error));

      next(action);
      break;
    }
    
    case DELETE_COMMENT: {
      axios.delete(`http://localhost:8000/api/comment/${action.commentId}/delete`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))

      next(action);
      break;
    }
     

    case DELETE__SESSION: {

      const { user} = store.getState();
      const date = user.sessionDate + user.sessionTime;

      const bodyParameter = {
        title : user.sessionTitle, 
        description:user.sessionDescription,
        date,
        time:user.sessionTime, 
        city:user.sessionCity,
        region:user.sessionRegion,
        propose: user.id,
      }
      const id = action.id;
      axios.delete(`http://localhost:8000/api/session/${id}/delete` ,  bodyParameter)

      .then((response) => {
        console.log(response);
        location.href = '/sessions';
      })
      .catch((error) => console.log(error))


      next(action);
      break;
    }

    case EDIT__SESSION: {

      const { user} = store.getState();
      const date = user.sessionDate + user.sessionTime;

      const bodyParameter = {
        title : user.sessionTitle, 
        description:user.sessionDescription,
        date,
        time:user.sessionTime, 
        city:user.sessionCity,
        region:user.sessionRegion,
        propose: user.id,
      }

      const id = action.id;
      console.log(id);
      axios.patch(`http://localhost:8000/api/session/${id}/edit` ,  bodyParameter)
 

      .then((response) => {
        console.log(response);
        location.href = `/sessions/${id}`;
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

export default sessions;
