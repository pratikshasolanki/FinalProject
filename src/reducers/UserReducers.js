import {
  USER_LIST_SUCCESSFULL,
  USER_LIST_FAILURE,
  SHOW_LOADING,
} from '../actions/UsersActions';

export const initialState = {
  userListData: [],
  userListErrorData: '',
  showLoading: false,
  userListError: false,
};

const UserReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST_SUCCESSFULL:
      state = {
        ...state,
        userListData: action.userListData,
        userListError: false,
      };
      return state;
    case USER_LIST_FAILURE:
      state = {
        ...state,
        userListErrorData: action.userListErrorData,
        userListError: true,
      };
      return state;
    case SHOW_LOADING:
      state = {...state, showLoading: action.showLoading};
      return state;
    default:
      return state;
  }
};

export default UserReducers;
