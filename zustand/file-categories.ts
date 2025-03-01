import { create } from "zustand";
import Cookies from "js-cookie";
import { verifyToken } from "@/lib/token";
import { getFileCategories } from "@/services/file-categories";
import { FileCategoriesEntity } from "@/entities/file-categories";

interface FileCategoriesType {
  fileCategories: FileCategoriesEntity[] | null
  getFileCategories: () => Promise<void>
}

export const useFileCategories = create<FileCategoriesType>()((set) => ({
  fileCategories: null,
  getFileCategories: async () => {
    try {
      const token = Cookies.get('token');
      const dataParse = await verifyToken(token || '')
      if(dataParse?.user_id) {
        const res = await getFileCategories()
        set({ fileCategories: res.fileCategories })
      }
    } catch (err) {
      console.log(err)
    }
  }
}))