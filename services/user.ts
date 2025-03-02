import { api } from "@/utils/api";
import { USER_ROLE } from "@prisma/client";

export function createUser({ username, fullName, role, password }: { username: string, fullName: string, role: USER_ROLE, password: string }) {
  return api(`/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, fullName, role }),
  })
}

export function getUsers({ search, page, pageSize }: { search?: string, page?: number, pageSize?: number }) {
  const params = new URLSearchParams();
  if (search) params.append('search', search.toString());
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  return api(`/api/users?${params.toString()}`);
}

export function updateUser({ id, fullName, role }: { id: number, fullName: string, role: USER_ROLE }) {
  return api(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullName, role }),
  })
}

export function deleteUser(id: number) {
  return api(`/api/users/${id}`, {
    method: 'DELETE',
  })
}

export function changePassword({ id, password }: { id: number, password: string }) {
  return api(`/api/users/change-password/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })
}

export function getMe() {
  return api(`/api/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}