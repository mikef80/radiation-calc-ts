import axios from "axios";
axios.defaults.withCredentials = true;

const serverURL = import.meta.env.VITE_SERVER_URL;
// const serverURL = "http://localhost:8000";
// const serverURL = "https://radiation-calc-ts.onrender.com";

export async function getCalculations() {
  return await axios.get(`${serverURL}/data/calcs`);
}

export async function postCalculation(calcData: any) {
  return await axios.post(`${serverURL}/data/calcs`, calcData);
}
