import axios from "axios";
export let baseUrl = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
// https://ecommerce-backend-ten-beta.vercel.app
