const AuthReducer = (state, action) => {
 // alert("HI?")
    switch (action.type) {
      case "LOGIN": {
        return {
          currentUser: action.payload,
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