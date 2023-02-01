import { CLOSE_BURGER, CLOSE_HELMET, TOGGLE_BURGER, TOGGLE_HELMET, } from '../actions/skyhub';

export const initialState = {
  isBurgerOpen: false,
  isHelmetOpen: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_BURGER:
      return {
        ...state,
        isBurgerOpen: !state.isBurgerOpen,
      };
    case CLOSE_BURGER:
      return {
        ...state,
        isBurgerOpen: false,
      };
      case TOGGLE_HELMET:
      return {
        ...state,
        isHelmetOpen: !state.isHelmetOpen,
      };
      case CLOSE_HELMET:
      return {
        ...state,
        isHelmetOpen: false,
      };

    default:
      return state;
  }
}

export default reducer;
