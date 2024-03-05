import { create } from "zustand";
let useCart = create((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
export default useCart