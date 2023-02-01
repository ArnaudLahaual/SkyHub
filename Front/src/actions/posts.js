export const FETCH_HOME_POSTS = 'FETCH_HOME_POSTS';
export const fetchHomePosts = () => ({
  type: FETCH_HOME_POSTS,
});

export const SAVE_HOME_POSTS = 'SAVE_HOME_POSTS';
export const saveHomePosts = (posts) => ({
  type: SAVE_HOME_POSTS,
  posts,
});

export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = () => ({
  type: FETCH_POSTS,
});

export const SAVE_POSTS = 'SAVE_POSTS';
export const savePosts = (posts) => ({
  type: SAVE_POSTS,
  posts,
});

//récup de post par son id
export const FETCH_POST = 'FETCH_POST';
export const fetchPost = () => ({
  type: FETCH_POST,
});

// save d'un post par son id
export const SAVE_POST = 'SAVE_POST';
export const savePost = (post) => ({
  type: SAVE_POST,
  posts,
});



