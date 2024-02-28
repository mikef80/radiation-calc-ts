import axios from "axios";
axios.defaults.withCredentials = true;

export async function getCalculations() {
  return await axios.get("http://localhost:8000/data/calcs");
}

export async function postCalculation(calcData: any) {
  console.log(calcData, '<--calcData');
  
  return await axios.post("http://localhost:8000/data/calcs", calcData);
}
