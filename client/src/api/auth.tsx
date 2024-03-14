import axios from "axios";
axios.defaults.withCredentials = true;
import Cookies from "js-cookie";

// const serverURL = "http://localhost:8000";
const serverURL = "https://radiation-calc-ts.onrender.com";

const jwtToken = Cookies.get("token");
console.log(jwtToken);

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
