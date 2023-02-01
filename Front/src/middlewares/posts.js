import axios from 'axios';


import { FETCH_ADDPOST, FETCH_HOME_POSTS, FETCH_POST, FETCH_POSTS, saveHomePosts, savePost, savePosts } from '../actions/posts';

const posts = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_HOME_POSTS: {
      axios.get('http://localhost:8000/api/latest/posts')
        .then((response) => {
          store.dispatch(saveHomePosts(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

      next(action);
      break;
    }

    case FETCH_POSTS: {
      axios.get('http://localhost:8000/api/posts')
        .then((response) => {
          store.dispatch(savePosts(response.data));

        })
        .catch((error) => {
          console.log(error);
        });

      next(action);
      break;
    }

    case FETCH_POST: {
      axios.get('http://localhost:8000/api/post/id')
        .then((response) => {
          store.dispatch(savePost(response.data));
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      next(action);
      break;
    }


    default:
      next(action);
      break;
  }
};

export default posts;
