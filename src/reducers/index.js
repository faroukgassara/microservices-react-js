import { combineReducers } from "redux";
import { jwt } from "../actions/profile";
import profile from './profile';

const reducers = combineReducers({
    user: profile,
  });

export default reducers