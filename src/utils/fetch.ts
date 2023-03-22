// Import axios
import axios from "axios";

// Define host const
const host = "http://localhost:5000";

export const find = async (city: string) => {
  const res = await axios.get(`${host}/find/${city}`);
  return res.data;
};

export const calc = async (cities: Array<string>) => {
  const res = await axios.post(`${host}/calc`, {
    cities: cities,
  });
  return res.data;
};
