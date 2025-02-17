import { api } from "@/utils/api";

export function createInsightMother(data: { keyword: string, content: string }) {
  return api(`/api/insight-mother`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getInsightMothers({ search, page, pageSize }: { search?: string, page?: number, pageSize?: number }) {
  const params = new URLSearchParams();
  if (search) params.append('search', search.toString());
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  return api(`/api/insight-mother?${params.toString()}`);
}

export function updateInsightMother({ id, data } : { id: number, data: { keyword: string, content: string } }) {
  return api(`/api/insight-mother/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteInsightMother(id: number) {
  return api(`/api/insight-mother/${id}`, {
    method: 'DELETE',
  })
}
