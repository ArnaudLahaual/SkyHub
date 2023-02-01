import { combineReducers } from 'redux';

import skyhubReducer from './skyhub';
import sessionsReducer from './sessions';
import userReducer from './user';
import postsReducer from './posts';
import modalReducer from './modal';
import commentReducer from './comment';

const rootReducer = combineReducers({
  skyhub: skyhubReducer,
  sessions: sessionsReducer,
  user: userReducer,
  posts: postsReducer,
  modal: modalReducer,
  comment: commentReducer,

});

export default rootReducer;
