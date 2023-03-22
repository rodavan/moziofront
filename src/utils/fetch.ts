// Import axios
import axios from "axios";

// Define host const
const host = "https://mozio-front-back.onrender.com/";

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
