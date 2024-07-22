import { UserType } from "./../types/user/user.type";
import AxiosClient from "./axiosConfig";

export const Login = async (
  username: string,
  password: string
) => {
  const res = await AxiosClient.post("/User/Login", {
    username,
    password,
  });
  return res.data;
};

export const Register = async ({
  username,
  password,
  firstName,
  lastName,
  Email,
  phoneNumber,
  photo,
}: UserType) => {
  const res = await AxiosClient.post("/User", {
    username,
    password,
    firstName,
    lastName,
    Email,
    phoneNumber,
    photo,
  });
  return res.data;
};
