import jwt_decode from "jwt-decode";

function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
  }
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
}

export function readToken() {
  const token = getToken();
  return token ? jwt_decode(token) : null;
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
  }
}

export async function authenticateUser(user, password) {
  if(user === 'test' && password === 'test')
  {
    console.log('User Logged in successfully')
    return true
  }
  else{
    throw new Error("Not valid username and password")
  }
}