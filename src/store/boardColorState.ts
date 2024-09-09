import { boardColorStateInterface } from "interface/boardStateInterface";
import { create } from "zustand";

export const boardColorState = create<boardColorStateInterface>(set => ({
  colorState: "#000000",
  setColorState: color => set({ colorState: color }),
}));

export default boardColorState;
