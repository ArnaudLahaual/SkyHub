import { createStore, applyMiddleware, compose } from 'redux';

import reducer from 'src/reducers';
import posts from '../middlewares/posts';
import sessions from '../middlewares/sessions';
import user from '../middlewares/user';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(sessions, posts, user),
);

const store = createStore(reducer, enhancers);

export default store;
