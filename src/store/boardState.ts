import { boardStateInterface } from "interface/boardStateInterface";
import { create } from "zustand";

export const boardState = create<boardStateInterface>(set => ({
  cursorState: "cursor",
  setCursorState: (cursorState: string) => set({ cursorState }),
}));

export default boardState;
