import axios from "axios";
axios.defaults.withCredentials = true;

const url = 'https://radiation-calc-ts.onrender.com'
// const url = 'http://localhost:8000'

export async function getCalculations() {
  return await axios.get(`${url}/data/calcs`);
}

export async function postCalculation(calcData: any) {
  return await axios.post(`${url}/data/calcs`, calcData);
}
