import { create } from "zustand";
import axios, { handelError } from "../Api/axiosConfig";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export type User = {
  username: string;
  firstname: string;
  lastname: string;
  photo: string;
  token: string;
  userId: number;
};

type Action = {
  user: User | null;
  GetUserFromLocalStorage: () => void;
  Logout: () => Promise<void>;
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
  user: null,
  GetUserFromLocalStorage: () => {
    const userData = localStorage.getItem("user");
    set({ user: userData ? JSON.parse(userData) : null });
  },
  Logout: async () => {
    localStorage.removeItem("user");
    set({
      user: GetUserFromLocalStorage(),
    });
    toast.warn("Logout");
  },
}));
