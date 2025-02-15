import Cookies from 'js-cookie';

export async function api(url: string, options: RequestInit = {}) {
  const token = Cookies.get('token');

  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || 'Something went wrong!');
  }

  return res.json();
}
