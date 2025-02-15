import { api } from "@/utils/api";

export function getFiles({ category, page, pageSize, search }: { category?: string, page?: number, pageSize?: number, search?: string }) {
  const params = new URLSearchParams();
  if (category) params.append('category', category.toString());
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  if (search) params.append('search', search.toString());
  
  return api(`/api/get-files?${params.toString()}`);
}