import axios from "axios";
axios.defaults.withCredentials = true;

export async function getCalculations() {
  return await axios.get("http://localhost:8000/data/calcs");
}
