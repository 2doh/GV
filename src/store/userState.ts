import { userStateInterface } from "interface/userSignInterface";
import { create } from "zustand";

export const userState = create<userStateInterface>(set => ({
  userMail: "",
  userName: "",
  accessToken: "",
  setUserMail: (userMail: string) => set({ userMail }),
  setUserName: (userName: string) => set({ userName }),
  setAccessToken: (token: string) => set({ accessToken: token }),
}));

export default userState;
