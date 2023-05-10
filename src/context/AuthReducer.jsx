const AuthReducer = (state, action) => {
  console.log(action)
    switch (action.type) {
      case "LOGIN": {
        return {
          currentUser: action.payload.user,
          userName:action.payload.name
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