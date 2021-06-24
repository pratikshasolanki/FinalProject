export const POST_LIST_SUCCESSFULL = 'POST_LIST_SUCCESSFULL';
export const POST_LIST_FAILURE = 'POST_LIST_FAILURE';
export const SHOW_LOADING = 'SHOW_LOADING';

export function postListSuccess(postListData) {
  return {
    type: POST_LIST_SUCCESSFULL,
    postListData,
  };
}

export function postListFailure() {
  return {
    type: POST_LIST_FAILURE,
    postListError: true,
    postListErrorData: 'post list fetching error',
  };
}

export function showLoadingAction(showLoading) {
  return {
    type: SHOW_LOADING,
    showLoading,
  };
}

export function fetchPostsList() {
  return async dispatch => {
    console.log('Fetch post list ->');
    dispatch(showLoadingAction(true));
    const url = 'https://jsonplaceholder.typicode.com/posts';
    await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        //
        console.log('data ->', data);
        dispatch(showLoadingAction(false));
        dispatch(postListSuccess(data));
      })
      .catch(error => {
        dispatch(showLoadingAction(false));
        dispatch(postListFailure());
      });
  };
}

export const ADD_POST_SUCCESSFULL = ' ADD_POST_SUCCESSFULL';
export const ADD_POST_FAILURE = ' ADD_POST_FAILURE';

export function addPostSuccess(addPostData) {
  return {
    type: ADD_POST_SUCCESSFULL,
    addPostData,
  };
}

export function addPostFailure() {
  return {
    type: ADD_POST_FAILURE,
    addPostError: true,
    addPostErrorData: 'add Post fetching error',
  };
}

export function addPost(userId, postDetail, postName, postId) {
  return async dispatch => {
    const data = {
      title: postName,
      body: postDetail,
      userId: userId,
      id: postId + 1,
    };
    console.log('[add post] user id ->', data);
    dispatch(addPostSuccess(data));
    //   console.log('[add post] user id ->', userId);
    //   dispatch(showLoadingAction(true));

    //   let body = JSON.stringify({
    //     title: postName,
    //     body: postDetail,
    //     userId: userId,
    //   });
    //   console.log('[add post] body ->', body);
    //   await fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json; charset=UTF-8',
    //     },
    //     body: body,
    //   })
    //     .then(response => {
    //       console.log('response -> ', response);
    //       return response.json();
    //     })
    //     .then(data => {
    //       //
    //       console.log('add post data ->', data);
    //       dispatch(showLoadingAction(false));
    //       dispatch(addPostSuccess(data));
    //     })
    //     .catch(error => {
    //       dispatch(showLoadingAction(false));
    //       dispatch(addPostFailure());
    //     });
  };
}

export const POST_UPDATE_SUCCESSFULL = 'POST_UPDATE_SUCCESSFULL';
export const POST_UPDATE_FAILURE = 'POST_UPDATE_FAILURE';

export function postUpdateSuccess(postUpdateData) {
  return {
    type: POST_UPDATE_SUCCESSFULL,
    postUpdateData,
  };
}

export function postUpdateFailure() {
  return {
    type: POST_UPDATE_FAILURE,
    postUpdateError: true,
    postUpdateErrorData: 'post update error',
  };
}

export function onUpdatePost(userId, id, postDetail, postName) {
  return async dispatch => {
    // console.log('post ->', userId);
    // dispatch(showLoadingAction(true));
    // await fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     id: id,
    //     title: postName,
    //     body: postDetail,
    //     userId: userId,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     //
    //     console.log('data ->', data);
    //     dispatch(showLoadingAction(false));
    //     dispatch(postUpdateSuccess(data));
    //   })
    //   .catch(error => {
    //     dispatch(showLoadingAction(false));
    //     dispatch(postUpdateFailure());
    //   });
    const data = {
      title: postName,
      body: postDetail,
      userId: userId,
      id,
    };
    console.log('[update post]  ->', data);
    dispatch(postUpdateSuccess(data));
  };
}

export const POST_DELETE_SUCCESSFULL = 'POST_DELETE_SUCCESSFULL';
export const POST_DELETE_FAILURE = 'POST_DELETE_FAILURE';

export function postDeleteSuccess(postDeleteData) {
  return {
    type: POST_DELETE_SUCCESSFULL,
    postDeleteData,
  };
}

export function postDeleteFailure() {
  return {
    type: POST_DELETE_FAILURE,
    postDeleteError: true,
    postDeleteErrorData: 'post list fetching error',
  };
}

export function onDeletePost(userId, id) {
  return async dispatch => {
    //   console.log('post ->', userId);
    //   dispatch(showLoadingAction(true));
    //   await fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'DELETE',
    //     body: JSON.stringify({
    //       id: id,
    //       userId: userId,
    //     }),
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //     },
    //   })
    //     .then(response => {
    //       return response.json();
    //     })
    //     .then(data => {
    //       //
    //       console.log('data ->', data);
    //       dispatch(showLoadingAction(false));
    //       dispatch(postDeleteSuccess(data));
    //     })
    //     .catch(error => {
    //       dispatch(showLoadingAction(false));
    //       dispatch(postDeleteFailure());
    //     });
    const data = {
      userId: userId,
      id,
    };
    console.log('[delete post]  ->', data);
    dispatch(postDeleteSuccess(data));
  };
}
