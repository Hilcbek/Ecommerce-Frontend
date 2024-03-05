import axios from "axios";
export let baseUrl = axios.create({
  baseURL: "https://ecommerce-backend-ten-beta.vercel.app/api",
  withCredentials: true,
});
// 
