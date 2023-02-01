export const CHANGE_FILTER_VALUE = 'CHANGE_FILTER_VALUE';
export const changeFilterValue = (filterName, value) => ({
  type: CHANGE_FILTER_VALUE,
  filterName,
  value,
});

export const SAVE_HOME_SESSIONS = 'SAVE_HOME_SESSIONS';
export const saveHomeSessions = (sessions) => ({
  type: SAVE_HOME_SESSIONS,
  sessions,
});

export const FETCH_HOME_SESSIONS = 'FETCH_HOME_SESSIONS';
export const fetchHomeSessions = () => ({
  type: FETCH_HOME_SESSIONS,
});

// Récupétaion de la liste des sessions
export const FETCH_SESSIONS = 'FETCH_SESSIONS';
export const fetchSessions = () => ({
  type: FETCH_SESSIONS,
});

// Sauvegarde de la liste des sessions
export const SAVE_SESSIONS = 'SAVE_SESSIONS';
export const saveSessions = (sessions) => ({
  type: SAVE_SESSIONS,
  sessions,
});

// récupération des sessions par région
export const FETCH_SESSIONS_BY_AREA = 'FETCH_SESSIONS_BY_AREA';
export const fetchSessionsByArea = () => ({
  type: FETCH_SESSIONS_BY_AREA,
});

// récupération des sessions par région
export const SAVE_SESSIONS_BY_AREA = 'SAVE_SESSIONS_BY_AREA';
export const saveSessionsByArea = (sessions) => ({
  type: SAVE_SESSIONS_BY_AREA,
  sessions,
});

//récup de session par son id
export const FETCH_SESSION = 'FETCH_SESSION';
export const fetchSession = (id) => ({
  type: FETCH_SESSION,
  id,
});

// save d'un session par son id
export const SAVE_SESSION = 'SAVE_SESSION';
export const saveSession = (session,id) => ({
  type: SAVE_SESSION,
  session,
  id,
});


// supprime l'utilisateur de la liste des participants d'une session
export const REMOVE_PARTICIPANT = 'REMOVE_PARTICIPANT';
export const removeParticipant = (nickname) => ({
  type: REMOVE_PARTICIPANT,
  nickname,
});

// ajoute l'utilisateur dans la liste des participants d'une session
export const ADD_PARTICIPANT = 'ADD_PARTICIPANT';
export const addParticipant = (nickname) => ({
  type: ADD_PARTICIPANT,
  nickname,
});

// action ajout d'une session
export const ADD__SESSION = 'ADD__SESSION';
export const AddSession = (
) => ({
  type: ADD__SESSION,
});

// action suppression d'une session par son id 
export const DELETE__SESSION = 'DELETE__SESSION';
export const deleteSession = (id) => ({
  type: DELETE__SESSION,
  id,
});

// action de modifier une session par son id 
export const EDIT__SESSION = 'EDIT__SESSION';
export const editSession = (id) => ({
  type: EDIT__SESSION,
  id,
});



