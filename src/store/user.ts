import { create } from "zustand";
import axios, { handelError } from "../Api/axiosConfig";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export type User = {
  username: string;
  firstname: string;
  lastname: string;
  token: string;
};

type Action = {
  user: User | null; //
  Login: (
    username: string,
    password: string
  ) => Promise<boolean>;
  Logout: () => Promise<void>;
  Register: (
    username: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string,
    email: string,
    phonenumber?: string,
    photo?: string
  ) => Promise<boolean>;
};

const GetUserFromLocalStorage = () => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};

export const UserStore = create<Action>((set) => ({
  user: GetUserFromLocalStorage(),
  Login: async (username: string, password: string) => {
    try {
      const res = await axios.post("/User/Login", {
        username,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data)
        );
        set({
          user: res.data,
        });
        toast.success("Login successfull");
        return true;
      }
    } catch (error) {
      handelError(error);
    }
    return false;
  },
  Logout: async () => {
    localStorage.removeItem("user");
    set({
      user: GetUserFromLocalStorage(),
    });
    toast.warn("Logout");
  },
  Register: async (
    username: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string,
    email: string,
    phonenumber?: string,
    photo?: string
  ) => {
    try {
      if (password === confirmPassword) {
        const res = await axios.post("/User", {
          username,
          password,
          firstname,
          lastname,
          email,
          phonenumber,
          photo,
        });
        if (res.status === 201) {
          toast.success("Register successfull");
          return true;
        }
      } else {
        toast.warning("Error");
        return false;
      }
    } catch (error) {
      handelError(error);
    }
    return false;
  },
}));
