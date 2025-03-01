import { api } from "@/utils/api";

export function getFiles({ slug, page, pageSize, search }: { slug?: string, page?: number, pageSize?: number, search?: string }) {
  const params = new URLSearchParams();
  if (slug) params.append('slug', slug.toString());
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  if (search) params.append('search', search.toString());

  return api(`/api/category-files?${params.toString()}`);
}

export function createFiles({ slug, data }: { slug: string, data: FormData }) {
  return api(`/api/category-files/${slug}`,
    {
      method: 'POST',
      body: data,
    }
  )
}

export function deleteFile({ id } : { id: number }) {
  return api(`/api/delete-file/${id}`, {
    method: 'DELETE',
  })
}