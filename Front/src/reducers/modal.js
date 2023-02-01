import { TOGGLE_MODAL, CLOSE_MODAL  } from "../actions/modal";

export const initialState = {
  isModalOpen: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };

    default:
      return state;
  }
}

export default reducer;

