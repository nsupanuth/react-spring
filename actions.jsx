export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function loginUser(creds) {

  let form = new FormData();
  form.append('grant_type','password');
  form.append('username',creds.username);
  form.append('password',creds.password);

  let config = {
    method: 'post',
    headers: { 'Authorization': 'Basic Y2xpZW50OnNlY3JldA=='},
    body: form
  }

  return dispatch => {
    dispatch(requestLogin(creds))
    return fetch('/oauth/token', config)
      .then(response => response.json().then(user => ({ user, response })))
      .then(({ user, response }) =>  {
        if (!response.ok) {
          dispatch(loginError(user.error_description))
          return Promise.reject(user)
        }
        else {
          localStorage.setItem('id_token', user.access_token)
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}
