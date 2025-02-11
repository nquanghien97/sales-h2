export async function loginUser( { username, password } : { username: string, password: string }) {
  const res =  await fetch(`/api/auth/login`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || 'Something went wrong!');
  }
  return res.json();
}