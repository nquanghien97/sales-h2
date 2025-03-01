import { api } from "@/utils/api";
import { GUIDES_CATEGORY } from "@prisma/client";

export function createGuides(data: { keyword: string, content: string, category: GUIDES_CATEGORY }) {
  return api(`/api/guides`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getGuides({ search, page, pageSize }: { search?: string, page?: number, pageSize?: number }) {
  const params = new URLSearchParams();
  if (search) params.append('search', search.toString());
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  return api(`/api/guides?${params.toString()}`);
}

export function updateGuides({ id, data } : { id: number, data: { keyword: string, content: string } }) {
  return api(`/api/guides/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteGuides(id: number) {
  return api(`/api/guides/${id}`, {
    method: 'DELETE',
  })
}
