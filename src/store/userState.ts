import { userStateInterface } from "interface/userSignInterface";
import { getCookie } from "util/cookie";
import { create } from "zustand";

const accessToken = getCookie("accesstoken");
const userNickName = getCookie("userName");
const userMailAddress = getCookie("userMail");

export const userState = create<userStateInterface>(set => ({
  userMail: userMailAddress || "",
  userName: userNickName || "",
  accessToken: accessToken || "",
  setUserMail: (userMail: string) => set({ userMail }),
  setUserName: (userName: string) => set({ userName }),
  setAccessToken: (token: string) => set({ accessToken: token }),
}));

export default userState;
