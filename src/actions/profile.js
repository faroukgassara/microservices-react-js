
import { Types } from '../constants/actionTypes';

export const signIn = (user) => {

  //addProfile: (user) => ({ type: Types.ADD_USER, payload: { user } }),

  //updateProfileImage: (image) => ({ type: Types.UPDATE_PROFILE_PICTURE, payload: { image } }),

  //updateProfile: (user) => ({ type: Types.UPDATE_USER, payload: { user } }),

  //formSubmittionStatus: (status) => ({ type: Types.FORM_SUBMITION_STATUS, payload: { status }}),

  return (dispatch) => {dispatch({type: Types.LOGIN, payload: { user }})}
}

export const jwt = (jwt) => {
  return (dispatch) => {dispatch({type: Types.JWT, payload: { jwt }})}
}

export const logOut = () => {
  return (dispatch) => {dispatch({type: Types.LOGOUT, payload: {  }})}
}