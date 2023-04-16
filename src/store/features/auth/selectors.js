export const selectAuthRawData = (state) => state.auth;

export const selectUserAuthData = (state) => state.auth.userInfo;

export const selectAuthError = (state) => state.auth.error;
