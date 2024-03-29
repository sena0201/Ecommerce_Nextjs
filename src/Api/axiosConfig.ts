// axiosConfig.js

import axios from "axios";
import { toast } from "react-toastify";

export const handelError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const { response } = error;
    if (response) {
      if (response.status >= 400 && response.status < 500) {
        toast.warning(response.data);
      }
    } else {
      toast.warning("Network error!");
    }
  } else {
    toast.error(error);
  }
};

const instance = axios.create({
  baseURL: "https://localhost:44303/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
