"use client";

import Wrapper from "@/components/Wrapper";
import { UserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosClient, {
  SERVER_NAME,
} from "../../Api/axiosConfig";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { Login, Register } from "@/Api/user-api";
import { UserType } from "@/types/user/user.type";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";

type Account = {
  username: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  photo: FileList;
};

function AccountPage() {
  const router = useRouter();
  const getUserFromLocastorage = UserStore(
    (state) => state.GetUserFromLocalStorage
  );
  const [isRegister, setIsRegister] =
    useState<boolean>(false);
  const loginMutation = useMutation({
    mutationFn: (data: {
      usename: string;
      password: string;
    }) => Login(data.usename, data.password),
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      getUserFromLocastorage();
      router.push("/");
    },
    onError: () => {
      toast.error("Username or password incorrect");
    },
  });
  const registerMutation = useMutation({
    mutationFn: (data: UserType) => Register(data),
    onSuccess: () => {
      toast.success("Register success!");
      setIsRegister(false);
    },
    onError: () => {
      toast.error("Username available");
    },
  });
  const [imageUrl, setImageUrl] = useState<string>("");

  const registerSchema = yup.object().shape({
    username: yup
      .string()
      .min(6, "Username must have at least 6 characters")
      .required("This field is required"),
    password: yup
      .string()
      .min(6, "Username must have at least 6 characters")
      .matches(
        /[a-z]/,
        "Mật khẩu phải chứa ít nhất 1 chữ thường"
      )
      .matches(
        /[A-Z]/,
        "Mật khẩu phải chứa ít nhất 1 chữ hoa"
      )
      .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 số")
      .matches(
        /[!@#$%^&*()\\[\]{}\-_+=~`|:;\"'<>,./?]/,
        "Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt"
      )
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
    photo: yup.mixed().required("This field is required"),
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
      loginMutation.mutate({
        usename: data.username,
        password: data.password,
      });
    }
    if (isRegister) {
      if (imageUrl !== "") {
        registerMutation.mutate({
          username: data.username,
          password: data.password,
          firstName: data.firstname,
          lastName: data.lastname,
          Email: data.email,
          phoneNumber: data.phonenumber,
          photo: imageUrl,
        });
      } else {
        toast.warning("Please select a photo");
      }
    }
  };

  const hanleSelectImage = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await AxiosClient.post(
        "/Upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl(res.data);
    }
  };

  return (
    <Wrapper>
      <div className="py-8 grid place-items-center">
        <form
          className="border-[1px] border-primary w-1/3 lg:w-1/2 md:w-1/2 sm:w-11/12 xs:w-11/12 p-5"
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
                onChange={hanleSelectImage}
              />
              <div className="w-[200px] h-[200px] rounded border-solid border-2 border-primary overflow-hidden">
                {imageUrl && (
                  <Image
                    src={SERVER_NAME + imageUrl}
                    alt=""
                    width={200}
                    height={200}
                    className="w-full h-full"
                  />
                )}
              </div>
              {errors.photo && (
                <p className="text-xs text-red mt-2 ml-2">
                  {errors.photo.message}
                </p>
              )}
            </div>
          )}
          <div className="mt-4 flex justify-between items-center">
            <button className="border-none outline-none bg-primary text-white px-6 py-3 flex items-center gap-2">
              {registerMutation.isPending ||
                (loginMutation.isPending && (
                  <MoonLoader color="#ffffff" size={20} />
                ))}
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
