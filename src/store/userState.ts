import { create } from "zustand";

interface userState {
  userId: string;
  userNickName: string;
  setUserId: () => void;
  setUserNickName: () => void;
}

const userState = create<userState>(set => ({
  userId: "",
  userNickName: "",
  setUserId: () => set(state => ({ userId: state.userId })),
  setUserNickName: () => set(state => ({ userId: state.userId })),
}));

export default userState;
