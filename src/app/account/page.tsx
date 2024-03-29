"use client";

import Wrapper from "@/components/Wrapper";
import { UserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../Api/axiosConfig";

type Account = {
  username: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber?: string;
  photo: FileList;
};

function AccountPage() {
  const Register = UserStore((state) => state.Register);
  const Login = UserStore((state) => state.Login);
  const User = UserStore((state) => state.user);
  const router = useRouter();

  const [isRegister, setIsRegister] =
    useState<boolean>(false);

  const registerSchema = yup.object().shape({
    username: yup
      .string()
      .min(6, "Username must have at least 6 characters")
      .required("This field is required"),
    password: yup
      .string()
      .min(6, "Username must have at least 6 characters")
      .required("This field is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password must match")
      .required("This field is required"),
    firstname: yup
      .string()
      .required("This field is required"),
    lastname: yup
      .string()
      .required("This field is required"),
    email: yup
      .string()
      .email()
      .required("This field is required"),
    phonenumber: yup.string().nullable(),
    photo: yup.mixed().nullable(),
  });
  const loginSchema = yup.object().shape({
    username: yup
      .string()
      .min(6, "Username must have at least 6 characters")
      .required("This field is required"),
    password: yup
      .string()
      .min(6, "Username must have at least 6 characters")
      .required("This field is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<Account>({
    resolver: yupResolver<any>(
      isRegister ? registerSchema : loginSchema
    ),
  });
  const handleToggle = () => {
    setIsRegister(!isRegister);
  };

  const onSubmit = async (data: Account) => {
    if (!isRegister) {
      const check = await Login(
        data.username,
        data.password
      );
      if (check) {
        router.push("/");
      }
    }
    if (isRegister) {
      // const check = await Register(
      //   data.username,
      //   data.password,
      //   data.confirmPassword,
      //   data.firstname,
      //   data.lastname,
      //   data.email,
      //   data.phonenumber,
      //   data.photo
      // );
      // if (check) {
      //   handleToggle();
      // }
    }
  };

  return (
    <Wrapper>
      <div className="py-8 grid place-items-center">
        <form
          className="border-[1px] border-primary w-1/3 min-w-[350px] p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="username">Usernames</label>
            <input
              type="text"
              className="w-full border-[1px] border-orange-200 rounded outline-none p-2"
              id="username"
              {...register("username")}
              autoComplete="false"
            />
            {errors.username &&
              touchedFields.username?.valueOf && (
                <p className="text-xs text-red mt-2 ml-2">
                  {errors?.username.message}
                </p>
              )}
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="w-full border-[1px] border-orange-200 rounded outline-none p-2"
              id="password"
              {...register("password")}
            />
            {errors.password &&
              touchedFields.password?.valueOf && (
                <p className="text-xs text-red mt-2 ml-2">
                  {errors?.password.message}
                </p>
              )}
          </div>
          {isRegister && (
            <div className="mt-4">
              <label htmlFor="ConfirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border-[1px] border-orange-200 rounded outline-none p-2"
                id="ConfirmPassword"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword &&
                touchedFields.confirmPassword?.valueOf && (
                  <p className="text-xs text-red mt-2 ml-2">
                    {errors?.confirmPassword.message}
                  </p>
                )}
            </div>
          )}
          {isRegister && (
            <div className="mt-4">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                className="w-full border-[1px] border-orange-200 rounded outline-none p-2"
                id="Email"
                {...register("email")}
              />
              {errors.email &&
                touchedFields.email?.valueOf && (
                  <p className="text-xs text-red mt-2 ml-2">
                    {errors?.email.message}
                  </p>
                )}
            </div>
          )}
          {isRegister && (
            <div className="mt-4">
              <label htmlFor="Firstname">First Name</label>
              <input
                type="text"
                className="w-full border-[1px] border-orange-200 rounded outline-none p-2"
                id="Firstname"
                {...register("firstname")}
              />
              {errors.firstname &&
                touchedFields.firstname?.valueOf && (
                  <p className="text-xs text-red mt-2 ml-2">
                    {errors?.firstname.message}
                  </p>
                )}
            </div>
          )}
          {isRegister && (
            <div className="mt-4">
              <label htmlFor="Lastname">Last Name</label>
              <input
                type="text"
                className="w-full border-[1px] border-orange-200 rounded outline-none p-2"
                id="Lastname"
                {...register("lastname")}
              />
              {errors.lastname &&
                touchedFields.lastname?.valueOf && (
                  <p className="text-xs text-red mt-2 ml-2">
                    {errors?.lastname.message}
                  </p>
                )}
            </div>
          )}
          {isRegister && (
            <div className="mt-4">
              <label htmlFor="Phonenumber">
                Phone number
              </label>
              <input
                type="text"
                className="w-full border-[1px] border-orange-200 rounded outline-none p-2"
                id="Phonenumber"
                {...register("phonenumber")}
              />
              {errors.phonenumber &&
                touchedFields.phonenumber?.valueOf && (
                  <p className="text-xs text-red mt-2 ml-2">
                    {errors?.phonenumber.message}
                  </p>
                )}
            </div>
          )}
          {isRegister && (
            <div className="mt-4">
              <input
                type="file"
                className="w-full border-[1px] border-orange-200 rounded outline-none p-2"
                {...register("photo")}
              />
              <div></div>
              {errors.photo &&
                touchedFields.photo?.valueOf && (
                  <p className="text-xs text-red mt-2 ml-2">
                    {/* {errors?.photo.message} */}
                  </p>
                )}
            </div>
          )}
          <div className="mt-4 flex justify-between items-center">
            <button className="border-none outline-none bg-primary text-white px-6 py-2">
              {isRegister ? "Register" : "Login"}
            </button>
            <div>
              <p
                onClick={handleToggle}
                className="hover:cursor-pointer"
              >
                {!isRegister ? "Register" : "Login"}
              </p>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}

export default AccountPage;
