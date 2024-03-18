import ACTIONS from "../actions/";

const initialState = {
  user: null,
  isAdmin: false,
  isLogged: false,
  token: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ACTIONS.LOGIN:
    //   return {
    //     ...state,
    //     isLogged: true,
    //   };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        isLogged: false,
        user: null,
        token: "",
      };
    case ACTIONS.GET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
      };
    default:
      return state;
  }
};

export default authReducer;
