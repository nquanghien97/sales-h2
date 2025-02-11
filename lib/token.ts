import { jwtVerify, SignJWT } from "jose";

const secretKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function createToken(user_id: number, user_role: string) {
  return new SignJWT({ user_id: user_id.toString(), user_role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
};

export async function verifyToken(token: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    const currentTime = Math.floor(Date.now() / 1000);

    // Kiểm tra nếu token đã hết hạn
    if (payload.exp && payload.exp < currentTime) {
      console.log('Token has expired');
      return null; // Trả về null nếu token hết hạn
    }
    return payload
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.log('Failed to verify session')
  }
}