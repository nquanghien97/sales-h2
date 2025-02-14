import { api } from "@/utils/api";

export function createHandleRejection({ category, content }: { category: string, content: string }) {
  return api(`/api/insight-mother`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category, content }),
  })
}

export function getHandleRejections({ search, page, pageSize }: { search?: string, page?: number, pageSize?: number }) {
  const params = new URLSearchParams();
  if (search) params.append('search', search.toString());
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  return api(`/api/insight-mother?${params.toString()}`);
}

export function updateHandleRejection({ id, category, content }: { id: number, category: string, content: string }) {
  return api(`/api/insight-mother/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category, content }),
  })
}

export function deleteHandleRejection(id: number) {
  return api(`/api/insight-mother/${id}`, {
    method: 'DELETE',
  })
}
