const initialState = {
  loggedIn: false,
  userId: null,
  userType: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        loggedIn: true,
        userId: action.payload.userId,
        userType: action.payload.userType,
      };
      case 'LOGOUT': 
        return initialState;
    default:
      return state;
  }
};

export default userReducer;