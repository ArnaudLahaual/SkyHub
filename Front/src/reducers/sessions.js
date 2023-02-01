
import { DELETE_COMMENT, SAVE_COMMENT } from '../actions/comment';

import {ADD_PARTICIPANT, REMOVE_PARTICIPANT, CHANGE_FILTER_VALUE, SAVE_HOME_SESSIONS, SAVE_SESSIONS, SAVE_SESSIONS_BY_AREA, SAVE_SESSION, ADD__SESSION } from '../actions/sessions';


const initialState = {
  loading: true,
  dateFilter: '',
  regionFilter: '',
  homeSessions: [],
  listSessions: [],
  currentSession:{},
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_FILTER_VALUE:
      return {
        ...state,
        [action.filterName]: action.value,
      };

    case SAVE_HOME_SESSIONS:
      return {
        ...state,
        homeSessions: action.sessions,
        loading: false,
      };

    case SAVE_SESSIONS:
      return {
        ...state,
        listSessions: action.sessions,
        loading: false,
      };

      case SAVE_SESSION:
      return {
        ...state,
        currentSession: action.session,
        loading: false,
      };
      
    case SAVE_SESSIONS_BY_AREA:
      return {
        ...state,
        listSessions: action.sessions,
      };


    case REMOVE_PARTICIPANT:
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          users: state.currentSession.users.filter((user) => user.nickname !== action.nickname)
        }
      }
    
    case ADD_PARTICIPANT:
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          users: [
            ...state.currentSession.users,
            {nickname: action.nickname}
          ]
        }
      }
    
    case SAVE_COMMENT:
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          comments: [
            ...state.currentSession.comments,
            {
              id: action.id,
              content: action.content,
              published_at: Date.now(),
              redact: {
                nickname: action.nickname,
              }
            }
          ]
        }
      }
    
    case DELETE_COMMENT:
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          comments: state.currentSession.comments.filter((comment) => comment.id !== action.commentId)
        }
      }
      


    default:
      return state;
  }

  
}

export default reducer;
