import axios, { isAxiosError } from "axios";

const apiService = axios.create({
  baseURL: process.env.NEXT_BACKEND_API_HOST,
});

export { isAxiosError };
export default apiService;
