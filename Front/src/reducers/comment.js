import { FETCH_COMMENT , ADD_COMMENT , DELETE_COMMENT } from '../actions/comment';

const initialState = {
    // loading:true,
    listComments: [],
};

function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_COMMENT:
            return {
                ...state,
                listComments: action.comments,
                loading: false
            }
        case ADD_COMMENT: 
        return{
          ...state,
          nickname: action.username,
          date: action.date,
          comment: action.comment,
        }
          
            default:
                return state;
            }
    }

export default reducer;
