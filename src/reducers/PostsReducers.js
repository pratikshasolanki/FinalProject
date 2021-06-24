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
      return {
        ...state,
        postListData: [action.addPostData, ...state.postListData],
      };
    case ADD_POST_FAILURE:
      state = {
        ...state,
        addPostErrorData: action.addPostErrorData,
        addPostError: true,
      };
      return state;

    case POST_DELETE_SUCCESSFULL:
      const filteredList = state.postListData.filter(
        post => post.id !== action.postDeleteData.id,
      );
      return {
        ...state,
        postListData: filteredList,
      };
    case POST_DELETE_FAILURE:
      state = {
        ...state,
        postDeleteErrorData: action.postDeleteErrorData,
        postDeleteError: true,
      };
      return state;
    case POST_UPDATE_SUCCESSFULL:
      const index = state.postListData.findIndex(
        post => post.id === action.postUpdateData.id,
      );
      const newArray = [...state.postListData];
      console.log('Index to update : ', newArray[index]);
      newArray[index].title = action.postUpdateData.title;
      console.log('Old title : ', newArray[index].title);
      console.log('New title : ', action.postUpdateData.title);
      newArray[index].body = action.postUpdateData.body;
      console.log('Old body : ', newArray[index].body);
      console.log('New body : ', action.postUpdateData.body);
      return {
        ...state,
        postListData: newArray,
      };
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
