import { api } from "@/utils/api";

export function getFiles({ category, page, pageSize }: { category?: string, page?: number, pageSize?: number }) {
  const params = new URLSearchParams();
  if (category) params.append('category', category.toString());
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  return api(`/api/get-files?${params.toString()}`);
}