import axios from "axios";
axios.defaults.withCredentials = true;

const serverURL = import.meta.env.VITE_SERVER_URL;

export async function onRegistration(registrationData: any) {
  return await axios.post(`${serverURL}/api/register`, registrationData);
}

export async function onLogin(loginData: any) {
  return await axios.post(`${serverURL}/api/login`, loginData);
}

export async function onLogout() {
  return await axios.get(`${serverURL}/api/logout`);
}

export async function onTermsAgree(termsData: any) {
  return await axios.post(`${serverURL}/api/terms`, termsData);
}

export async function fetchProtectedInfo() {
  return await axios.get(`${serverURL}/api/protected`);
}
