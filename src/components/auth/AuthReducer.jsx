const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state,
        currentUser: action.payload,
        userName: action.payload.name
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;