import { FileCategoriesEntity } from "@/entities/file-categories";
import { api } from "@/utils/api";
import { FILE_CATEGORY } from "@prisma/client";

export function createFileCategory(data: { title: string, category: FILE_CATEGORY }) {
  return api(`/api/file-categories`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getFileCategories() {
  return api(`/api/file-categories`);
}

export function updateFileCategory({ id, data }: { id: number, data: { title: string, category: FILE_CATEGORY } }) {
  return api(`/api/file-categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteFileCategory(id: number) {
  return api(`/api/file-categories/${id}`, {
    method: 'DELETE',
  })
}

export function updateOrder(categories: FileCategoriesEntity[]) {
  return api(`/api/update-order`, {
    method: 'PUT',
    body: JSON.stringify({categories}),
  })
}
