import { create } from 'zustand'
let useRegister = create((set) => ({
    open : false,
    onOpen : () => set({ open : true }),
    onClose : () => set({ open : false})
}))
export default useRegister