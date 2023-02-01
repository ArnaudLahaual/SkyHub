// récupérer les valeurs des champs formulaires
export const CHANGE_FIELD_VALUE = 'CHANGE_FIELD_VALUE';
export const changeFieldValue = (field, value) => ({
  type: CHANGE_FIELD_VALUE,
  field,
  value,
});

// récupérer les valeurs des champs formulaires
export const CHANGE_FIELD_VALUE__ADDSECTION = 'CHANGE_FIELD_VALUE__ADDSECTION';
export const changeFieldValueAddSection = (field, value) => ({
  type: CHANGE_FIELD_VALUE__ADDSECTION,
  field,
  value,
});

// action de login
export const LOGIN = 'LOGIN';
export const login = () => ({
  type: LOGIN,
});

// Action de connexion
export const CONNECT_USER = 'CONNECT_USER';
export const connectUser = (
  id,
  lastname,
  firstname,
  email, 
  nickname,
  city,
  region, 
  description,
  profil_picture,
  token ) => ({
    type: CONNECT_USER,
    id,
    lastname,
    firstname,
    email, 
    nickname,
    city,
    region,
    description,
    profil_picture,
    token
  });

// Action de déconnexion
export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT,
});

export const REGISTER = 'REGISTER';
export const register = () => ({
  type: REGISTER,
});
