import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, jwtDecrypt } from 'jose';
import { verifyAuth } from './lib/auth';


const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200'];

const JWT_SECRET = process.env.JWT_SECRET !== undefined ? process.env.JWT_SECRET : '';

export async function middleware(request: NextRequest) {
  let origin: string;
  let token;
  let jwtToken;

  const originHeader = request.headers.get('origin');
  origin = originHeader !== null ? originHeader : '';

  const res = NextResponse.next();

  if (!request.cookies.has('token')) {
    return NextResponse.redirect('http://localhost:3000');
  }

  token = request.cookies.get('token')?.value;

  const verifiedToken = token && (await verifyAuth(token).catch((err) => {
      console.log(err);
    }))

  if (!verifiedToken){
    return NextResponse.redirect('http://localhost:3000')
  }
  

  if (allowedOrigins.includes(origin)) {
    res.headers.append('Access-Control-Allow-Origin', origin);
    res.headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.headers.append('Access-Control-Allow-Credentials', 'true');
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }


    return res;
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: '/:path*',
};
