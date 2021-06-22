import {
  POST_LIST_SUCCESSFULL,
  POST_LIST_FAILURE,
  ADD_POST_SUCCESSFULL,
  ADD_POST_FAILURE,
  POST_DELETE_FAILURE,
  POST_DELETE_SUCCESSFULL,
  POST_UPDATE_FAILURE,
  POST_UPDATE_SUCCESSFULL,
  SHOW_LOADING,
} from '../actions/PostsActions';

export const initialState = {
  postListData: [],
  postListErrorData: '',
  showLoading: false,
  postListError: false,
  addPostData: [],
  addPostError: false,
  addPostErrorData: '',
  postUpdateData: '',
  postUpdateError: false,
  postUpdateErrorData: '',
  postDeleteData: '',
  postDeleteError: false,
  postDeleteErrorData: '',
};

const PostsReducers = (state = initialState, action) => {
  switch (action.type) {
    case POST_LIST_SUCCESSFULL:
      state = {
        ...state,
        postListData: action.postListData,
        postListError: false,
      };
      return state;
    case POST_LIST_FAILURE:
      state = {
        ...state,
        postListErrorData: action.postListErrorData,
        postListError: true,
      };
      return state;
    case ADD_POST_SUCCESSFULL:
      state = {
        ...state,
        addPostError: false,
      };
      return state;
    case ADD_POST_FAILURE:
      state = {
        ...state,
        addPostErrorData: action.addPostErrorData,
        addPostError: true,
      };
      return state;

    case POST_DELETE_SUCCESSFULL:
      state = {
        ...state,
        postDeleteData: action.postDeleteData,
        postDeleteError: false,
      };
      return state;
    case POST_DELETE_FAILURE:
      state = {
        ...state,
        postDeleteErrorData: action.postDeleteErrorData,
        postDeleteError: true,
      };
      return state;
    case POST_UPDATE_SUCCESSFULL:
      state = {
        ...state,
        postUpdateData: action.postUpdateData,
        postUpdateError: false,
      };
      return state;
    case POST_UPDATE_FAILURE:
      state = {
        ...state,
        postUpdateErrorData: action.postUpdateErrorData,
        postUpdateError: true,
      };
      return state;
    case SHOW_LOADING:
      state = {...state, showLoading: action.showLoading};
      return state;
    default:
      return state;
  }
};

export default PostsReducers;
