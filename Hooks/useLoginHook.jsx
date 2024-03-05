import { create } from "zustand";
let useLogin = create((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
export default useLogin;
