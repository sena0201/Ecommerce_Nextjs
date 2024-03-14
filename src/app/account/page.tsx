"use client";

import Wrapper from "@/components/Wrapper";
import { UserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type Account = {
  username: string;
  password: string;
  confirmPassword: string;
};

function AccountPage() {
  const users = UserStore((state) => state.users);
  const addUser = UserStore((state) => state.addUser);
  const router = useRouter();

  const [isRegister, setIsRegister] =
    useState<boolean>(false);

  const [data, setData] = useState<Account>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (
      isRegister &&
      data.password === data.confirmPassword
    ) {
      addUser({
        id: 123,
        username: data.username,
        password: data.password,
      });
      console.log(users);
    } else {
      users.forEach((user) => {
        if (
          user.username === data.username &&
          user.password === data.password
        ) {
          console.log("Login success");
          router.push("/home");
        } else {
          console.log("Login failure");
        }
      });
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;
    setData({ ...data, [name]: value });
  };

  const handleToggle = () => {
    setIsRegister(!isRegister);
  };
  return (
    <Wrapper>
      <div className="py-8 grid place-items-center">
        <form
          className="border-[1px] border-primary w-1/3 min-w-[350px] p-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="username">Usernames</label>
            <input
              type="text"
              className="w-full border-[1px] border-orange-200 rounded outline-none p-2"
              id="username"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="w-full border-[1px] border-orange-200 rounded outline-none p-2"
              id="password"
              name="password"
              onChange={handleChange}
            />
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
                name="confirmPassword"
                onChange={handleChange}
              />
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
