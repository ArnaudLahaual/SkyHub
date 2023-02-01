// Action d'ajout d'un commentaire dans la BDD
export const ADD_COMMENT = 'ADD_COMMENT' ;
export const addComment = (nickname, content) => ({
  type: 'ADD_COMMENT',
  nickname,
  content,
})

export const DELETE_COMMENT ='DELETE_COMMENT' ;
export const deleteComment = (commentId)  => ({
  type: 'DELETE_COMMENT',
  commentId, 
})

export const FETCH_COMMENT = 'FETCH_COMMENT';
export const fetchComment = () => ({
  type: 'FETCH_COMMENT',
})

// Action d'ajout d'un commentaire dans le state
export const SAVE_COMMENT = 'SAVE_COMMENT';
export const saveComment = (nickname, content, id) => ({
  type: 'SAVE_COMMENT',
  nickname,
  content,
  id,
})


// export const EDIT_COMMENT ='EDIT_COMMENT' ;
// export const editComment = () => ({


// })
