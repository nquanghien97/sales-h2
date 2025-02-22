import { api } from "@/utils/api";

export function createHandleRejection(data: { keyword: string, content: string }) {
  return api(`/api/handle-rejection`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getHandleRejections({ search, page, pageSize }: { search?: string, page?: number, pageSize?: number }) {
  const params = new URLSearchParams();
  if (search) params.append('search', search.toString());
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  return api(`/api/handle-rejection?${params.toString()}`);
}

export function updateHandleRejection({ id, data } : { id: number, data: { keyword: string, content: string } }) {
  return api(`/api/handle-rejection/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteHandleRejection(id: number) {
  return api(`/api/handle-rejection/${id}`, {
    method: 'DELETE',
  })
}
