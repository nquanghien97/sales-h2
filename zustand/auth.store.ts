import { UserEntity } from "@/entities/user";
import { getMe } from "@/services/user";
import { create } from "zustand";
import Cookies from "js-cookie";
import { verifyToken } from "@/lib/token";

interface AuthStoreType {
  me: UserEntity | null
  getMe: () => Promise<void>
  setMe: (user: UserEntity | ((prev: UserEntity | null) => UserEntity) | null) => void
  isLoading: boolean
}

export const useAuthStore = create<AuthStoreType>()((set) => ({
  me: null,
  isLoading: true,
  getMe: async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        set({ isLoading: false });
        return;
      }
      const dataParse = await verifyToken(token || '')
      if (dataParse?.user_id) {
        const res = await getMe()
        set({ me: res.user, isLoading: false })
      }
    } catch (err) {
      console.log(err)
      set({ isLoading: false })
    }
  },
  setMe: (item) =>
    set((state) => ({
      me: typeof item === "function" ? item(state.me) : item,
    }))
}))