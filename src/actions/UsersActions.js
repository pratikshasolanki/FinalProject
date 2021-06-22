export const USER_LIST_SUCCESSFULL = 'USER_LIST_SUCCESSFULL';
export const USER_LIST_FAILURE = 'USER_LIST_FAILURE';
export const SHOW_LOADING = 'SHOW_LOADING';
export function userListSuccess(userListData) {
  return {
    type: USER_LIST_SUCCESSFULL,
    userListData,
  };
}

export function userListFailure() {
  return {
    type: USER_LIST_FAILURE,
    userListError: true,
    userListErrorData: 'User list fetching error',
  };
}

export function showLoadingAction(showLoading) {
  return {
    type: SHOW_LOADING,
    showLoading,
  };
}

export function fetchUsersList() {
  return async dispatch => {
    console.log('data ->');
    dispatch(showLoadingAction(true));
    const url = 'https://jsonplaceholder.typicode.com/users/';
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
        dispatch(userListSuccess(data));
      })
      .catch(error => {
        dispatch(showLoadingAction(false));
        dispatch(userListFailure());
      });
  };
}
