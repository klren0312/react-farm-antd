import { create } from 'zustand'

interface AppState {
  num: number
  increase: () => void
  decrease: () => void
}

const useAppStore = create<AppState>((set) => ({
  num: 0,
  increase: () => set((state) => ({ num: state.num + 1 })),
  decrease: () => set((state) => ({ num: state.num - 1 })),
}))

export default useAppStore