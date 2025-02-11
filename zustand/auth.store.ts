import { UserEntity } from "@/entities/user";
import { getMe } from "@/services/user";
import { create } from "zustand";
import Cookies from "js-cookie";
import { parseJwt } from "@/utils/parseJwt";

interface AuthStoreType {
  me: UserEntity | null
  getMe: () => Promise<void>
}

export const useAuthStore = create<AuthStoreType>()((set) => ({
  me: null,
  getMe: async () => {
    try {
      const token = Cookies.get('token');
      const dataParse = parseJwt(token || '')
      if(dataParse.user_id) {
        const res = await getMe()
        set({ me: res.user })
      }
    } catch (err) {
      console.log(err)
    }
  }
}))