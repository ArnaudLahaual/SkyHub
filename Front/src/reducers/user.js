import { ADD__SESSION, DELETE__SESSION, EDIT__SESSION } from "../actions/sessions";
import { CHANGE_FIELD_VALUE, CHANGE_FIELD_VALUE__ADDSECTION, CONNECT_USER, LOGOUT, REGISTER } from "../actions/user";

const initialState = {
  id: '',
  lastname: '',
  firstname: '',
  email: '',
  password: '',
  isLogged: false,
  nickname: '',
  city: '',
  region: '',
  description: '',
  token: '',
  sessionComment: '',
  sessionTitle:'',
  sessionDescription:'',
  sessionCity:'',
  sessionRegion:'',
  sessionDate:'',
  sessionTime:'',


};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_FIELD_VALUE:
      return {
        ...state,
        // On accède à la clef de manière dynamique avec la notation []
        // => email: 'la valeur...',
        // OU
        // => password: 'la valeur...',
        [action.field]: action.value,
      };

      case CHANGE_FIELD_VALUE__ADDSECTION:
      return {
        ...state,
        // On accède à la clef de manière dynamique avec la notation []
        // => email: 'la valeur...',
        // OU
        // => password: 'la valeur...',
        [action.field]: action.value,
      };

    case CONNECT_USER:
      return {
        ...state,
        id: action.id,
        lastname: action.lastname,
        firstname: action.firstname,
        email: action.email,
        nickname: action.nickname,
        city: action.city,
        region: action.region,
        description: action.description,
        profil_picture: action.profil_picture,
        token: action.token,
        isLogged: true,
        password: '',
      };

    case LOGOUT:
      return {
        ...state,
        id: '',
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        isLogged: false,
        nickname: '',
        city: '',
        region: '',
        description: '',
        token: '',
      }

    case REGISTER:
      return {
        ...state,
        id: '',
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        isLogged: false,
        nickname: '',
        city: '',
        region: '',
        description: '',
        token: '',
      }

      case ADD__SESSION:
      return {
        ...state,
        sessionTitle:'',
        sessionDescription:'',
        sessionCity:'',
        sessionRegion:'',
        sessionDate:'',
        sessionTime:'',
      }

      case DELETE__SESSION:
      return {
        ...state,
        sessionTitle:'',
        sessionDescription:'',
        sessionCity:'',
        sessionRegion:'',
        sessionDate:'',
        sessionTime:'',
      }

      case EDIT__SESSION:
      return {
        ...state,
        sessionTitle:'',
        sessionDescription:'',
        sessionCity:'',
        sessionRegion:'',
        sessionDate:'',
        sessionTime:'',
      }

    default:
      return state;
  }
}

export default reducer;
