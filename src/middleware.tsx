import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200'];

export function middleware(req: { headers: { get: (arg0: string) => any; }; method: string; }) {
  const origin = req.headers.get('origin');

  const res = NextResponse.next();

  if (allowedOrigins.includes(origin)) {
    res.headers.append('Access-Control-Allow-Origin', origin);
    res.headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.headers.append('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
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
