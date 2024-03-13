import axios from "axios";
axios.defaults.withCredentials = true;

const url = 'https://radiation-calc-ts.onrender.com'
// const url = 'http://localhost:8000'

export async function onRegistration(registrationData: any) {
  return await axios.post(`${url}/api/register`, registrationData);
}

export async function onLogin(loginData: any) {
  return await axios.post(`${url}/api/login`, loginData);
}

export async function onLogout() {
  return await axios.get(`${url}/api/logout`);
}

export async function onTermsAgree(termsData: any) {
  return await axios.post(`${url}/api/terms`, termsData);
}

export async function fetchProtectedInfo() {
  return await axios.get(`${url}/api/protected`);
}
