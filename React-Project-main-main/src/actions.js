export const setUserInfo = (userId, userType) => {
  return {
    type: 'SET_USER_INFO',
    payload: { userId, userType },
  };
};

export const logoutUser = () => ({
  type: 'LOGOUT',
});

