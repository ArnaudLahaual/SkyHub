import { SAVE_HOME_POSTS, SAVE_POSTS } from '../actions/posts';

const initialState = {
  homePosts: [],
  listPosts: [],
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_HOME_POSTS:
      return {
        ...state,
        homePosts: action.posts,
      };

      case SAVE_POSTS:
      return {
        ...state,
        listPosts: action.posts,
      };

    default:
      return state;
  }
}

export default reducer;
