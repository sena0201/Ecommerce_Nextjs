import { create } from "zustand";

type User = {
  id: number;
  username: string;
  password: string;
};

type Action = {
  users: User[]; //
  addUser: (user: User) => void;
  removeUser: (id: number) => void;
  editUser: (
    id: number,
    username: string,
    password: string
  ) => void;
};

export const UserStore = create<Action>((set) => ({
  users: [],
  addUser: (user: User) =>
    set((state) => ({ users: [...state.users, user] })),
  removeUser: (id: number) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  editUser: (
    id: number,
    username: string,
    password: string
  ) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id
          ? { ...user, username, password }
          : user
      ),
    })),
}));
